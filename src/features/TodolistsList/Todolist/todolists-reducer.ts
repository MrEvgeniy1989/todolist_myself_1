import {todolistsAPI, TodolistType} from 'api/todolists-api'
import {ThunkDispatch} from 'redux-thunk'
import {AppRootStateType} from 'app/store'
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from 'app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'

type ActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter
      }
      return [...state]
    }
    case 'SET-TODOLISTS': {
      return action.todolists.map(todolist => ({
        ...todolist,
        filter: 'all',
        entityStatus: 'idle',
      }))
    }
    case 'CHANGE-TODOLIST-ENTITY-STATUS': {
      return state.map(todolist =>
        todolist.id === action.todolistId
          ? {
              ...todolist,
              entityStatus: action.status,
            }
          : todolist
      )
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
  return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {type: 'SET-TODOLISTS', todolists} as const
}
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
  return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, status} as const
}

export const setTodolistsTC = () => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .getTodolists()
    .then(res => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const createTodolist = (title: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .createTodolist(title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const deleteTodolist = (todolistId: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
  todolistsAPI
    .deleteTodolist(todolistId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const updateTodolist = (todolistId: string, title: string) => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .updateTodolist(todolistId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
