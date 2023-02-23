import {TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists_reducer';

type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const copyState = {...state}
            const newTask = {id: v1(), title: action.titleForNewTask, isDone: false}
            copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]]
            return {...copyState}
        }
        case 'REMOVE-TASK': {
            const copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return {...copyState}
        }
        case 'CHANGE-TASK-STATUS': {
            const copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].map(task => task.id === action.taskId
                ? {...task, isDone: action.isDoneNewStatus}
                : task)
            return {...copyState}
        }
        case 'CHANGE-TASK-TITLE': {
            const copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].map(task => task.id === action.taskId
                ? {...task, title: action.newTitle}
                : task)
            return {...copyState}
        }
        case 'ADD-TODOLIST': {
            const copyState = {...state}
            return {[action.todolistId]: [], ...copyState}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return {...copyState}
        }
        default: {
            return {...state}
        }
    }
}

export const addTaskAC = (todolistId: string, titleForNewTask: string) => {
    return {type: `ADD-TASK`, todolistId, titleForNewTask} as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: `REMOVE-TASK`, todolistId, taskId} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDoneNewStatus: boolean) => {
    return {type: `CHANGE-TASK-STATUS`, todolistId, taskId, isDoneNewStatus} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: `CHANGE-TASK-TITLE`, todolistId, taskId, newTitle} as const
}
