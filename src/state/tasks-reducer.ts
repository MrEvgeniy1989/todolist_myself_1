import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from './store';


type ActionsType = ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      const stateCopy = {...state}
      action.todolists.forEach(todolist => {stateCopy[todolist.id] = []})
      return stateCopy
    }
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      stateCopy[action.task.todoListId] = [action.task, ...stateCopy[action.task.todoListId]]
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      state[action.todolistId] = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      state[action.todolistId] = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {type: 'SET-TASKS', todolistId, tasks} as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}


export const setTasks = (todolistId: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  todolistsAPI.getTasks(todolistId)
    .then(res => {
      dispatch(setTasksAC(todolistId, res.data.items))
    })
}

export const createTask = (todolistId: string, title: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  todolistsAPI.createTask(todolistId, title)
    .then(res => {
      dispatch(addTaskAC(res.data.data.item))
    })
}
export const deleteTask = (todolistId: string, taskId: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  todolistsAPI.deleteTask(todolistId, taskId)
    .then(() => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
}
export const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>, getState: () => AppRootStateType) => {
    const state = getState().tasks
    const task = state[todolistId].find(t => t.id === taskId)
    if (!task) {
      console.warn('task not found in the state')
      return
    }

    todolistsAPI.updateTask(todolistId, taskId, {
      title: task.title,
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
      description: task.description,
      status
    })
      .then(() => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
      })
  }