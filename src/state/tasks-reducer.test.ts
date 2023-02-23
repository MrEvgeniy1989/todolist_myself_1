import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists_reducer';

test('The task must be added in the right todolist.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ]
    }

    const endState: TasksStateType = tasksReducer(startState, addTaskAC(todolistId1, 'Title for new task'))

    expect(endState[todolistId1][0].title).toBe('Title for new task')
    expect(endState[todolistId1].length).toBe(startState[todolistId1].length + 1)
})

test('Correct task should be deleted from correct todolist.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ]
    }

    const endState: TasksStateType = tasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1][0].title).toBe(startState[todolistId1][1].title)
    expect(endState[todolistId1].length).toBe(startState[todolistId1].length - 1)
    expect(endState).toEqual({
        [todolistId1]: [
            {id: startState[todolistId1][1].id, title: 'JS', isDone: true},
            {id: startState[todolistId1][2].id, title: 'ReactJS', isDone: false},
            {id: startState[todolistId1][3].id, title: 'rest api', isDone: false},
            {id: startState[todolistId1][4].id, title: 'graphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: startState[todolistId2][0].id, title: 'HTML&CSS', isDone: true},
            {id: startState[todolistId2][1].id, title: 'JS', isDone: true},
            {id: startState[todolistId2][2].id, title: 'ReactJS', isDone: false},
            {id: startState[todolistId2][3].id, title: 'rest api', isDone: false},
            {id: startState[todolistId2][4].id, title: 'graphQL', isDone: false}
        ]
    })
})

test('Status of specified task should be changed.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ]
    }

    const endState: TasksStateType = tasksReducer(startState, changeTaskStatusAC(todolistId1, startState[todolistId1][0].id, false))

    expect(endState[todolistId1][0].isDone).toBe(false)
    expect(endState[todolistId1][1].isDone).toBe(true)
    expect(endState[todolistId1].length).toBe(startState[todolistId1].length)
    expect(endState[todolistId2].length).toBe(startState[todolistId2].length)
})

test('The name of the specified task must be changed.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest api', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false}
        ]
    }

    const endState: TasksStateType = tasksReducer(startState, changeTaskTitleAC(todolistId1, startState[todolistId1][0].id, 'NewTitle'))

    expect(endState[todolistId1][0].title).toBe('NewTitle')
    expect(endState[todolistId1][1].title).toBe('JS')
    expect(endState[todolistId1].length).toBe(startState[todolistId1].length)
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const endState: TasksStateType = tasksReducer(startState, addTodolistAC('new todolist'))


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
