import {FilterType, TodolistType, todolistId1} from '../AppWithRedux';
import {v1} from 'uuid';


type ActionType =
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>

const getData = (value: string | null) => {
    if (value) {
        return JSON.parse(value)
    } else {
        return null
    }
}

const initialState: TodolistType[] = getData(localStorage.getItem('todolists')) || [
    {id: todolistId1, title: 'Технологии', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, filter: action.filterValue}
                : todolist)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: action.todolistId, title: action.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return [...state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, title: action.newTitle}
                : todolist
            )]
        }
        default: {
            return state
        }
    }
}


export const changeFilterAC = (todolistId: string, filterValue: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filterValue} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (newTitle: string) => {
    return {type: 'ADD-TODOLIST', newTitle, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}
