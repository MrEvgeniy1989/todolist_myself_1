import {addTodolistAC, removeTodolistAC, setTodolistsAC} from 'features/TodolistsList/Todolist/todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api'
import {ThunkDispatch} from 'redux-thunk'
import {AppRootStateType, AppThunk} from 'app/store'
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from 'app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}
export type TasksStateType = {
  [key: string]: Array<TaskDomainType>
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof changeTaskEntityStatusAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      const stateCopy = {...state}
      action.todolists.forEach(todolist => {
        stateCopy[todolist.id] = []
      })
      return stateCopy
    }
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks.map(task => ({
        ...task,
        entityStatus: 'idle',
      }))
      return stateCopy
    }
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      stateCopy[action.task.todoListId] = [
        {
          ...action.task,
          entityStatus: 'idle',
        },
        ...stateCopy[action.task.todoListId],
      ]
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.id]
      return copyState
    }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => (t.id === action.taskId ? {...t, ...action.model} : t)),
      }
    case 'CHANGE-TASK-ENTITY-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => (task.id === action.taskId ? {...task, entityStatus: action.status} : task)),
      }
    }
    default:
      return state
  }
}

// AC
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {type: 'SET-TASKS', todolistId, tasks} as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId,
  } as const
}
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
  return {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, status} as const
}

// Thunks
export const setTasks = (todolistId: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .getTasks(todolistId)
    .then(res => {
      dispatch(setTasksAC(todolistId, res.data.items))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const createTask = (todolistId: string, title: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .createTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const deleteTask = (todolistId: string, taskId: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
  todolistsAPI
    .deleteTask(todolistId, taskId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistId, taskId, domainModel))
          dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
