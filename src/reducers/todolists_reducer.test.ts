import {TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists_reducer';

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].id).toBe(startState[1].id)
})
test('todolistReducer should add a new Todolist correctly', () => {
    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(startState.length + 1)
    expect(endState[0].title).toBe('New Todolist')
})
test('correct todolist should change its name', () => {
    const endState: Array<TodolistType> = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'NewTitle'))

    expect(endState.length).toBe(startState.length)
    expect(endState[1].title).toBe('NewTitle')
    expect(endState[0].title).toBe(startState[0].title)
})
test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, 'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})