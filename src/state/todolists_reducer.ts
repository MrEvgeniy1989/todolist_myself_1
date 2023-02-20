import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';


type ActionType =
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>


export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, filter: action.filterValue}
                : todolist)
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: v1(), title: action.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, title: action.newTitle}
                : todolist
            )]
        default:
            return [...state]
    }
}


export const changeFilterAC = (todolistId: string, filterValue: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filterValue} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (newTitle: string) => {
    return {type: 'ADD-TODOLIST', newTitle} as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}