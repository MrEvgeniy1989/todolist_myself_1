import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';


export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'Технологии', filter: 'all'},
        {id: todolistId2, title: 'Что купить', filter: 'all'}
    ])
    let [tasks, setTasks] = useState<TasksStateType>(
        {
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
        })


    const changeFilter = (todolistId: string, filterValue: FilterType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, filter: filterValue}
            : todolist))
    }
    const removeTask = (todolistId: string, taskId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (todolistId: string, titleForNewTask: string) => {
        const newTask = {id: v1(), title: titleForNewTask, isDone: false}
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDoneNewStatus: boolean) => {
        tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId
            ? {...task, isDone: isDoneNewStatus}
            : task)
        setTasks({...tasks})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (newTitle: string) => {
        const newTodolist: TodolistType = {id: v1(), title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId
            ? {...task, title: newTitle}
            : task)
        setTasks({...tasks})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists([...todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, title: newTitle}
            : todolist
        )])
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {todolists.map(todolist => {
                let tasksForTodolist = tasks[todolist.id]

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                }

                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        filter={todolist.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
