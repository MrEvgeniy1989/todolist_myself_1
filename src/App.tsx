import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')


    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }


    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const addTask = (titleForNewTask: string) => {
        const task = {id: v1(), title: titleForNewTask, isDone: false}
        setTasks([task, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDoneNewStatus: boolean) => {
      setTasks(tasks.map(task => task.id === taskId
          ? {...task, isDone: isDoneNewStatus}
          : task))
    }


    return (
        <div className="App">
            <Todolist
                title={'Технологии'}
                tasks={tasks}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
