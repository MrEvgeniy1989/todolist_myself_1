import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from './App';

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterType) => void
    addTask: (titleForNewTask: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [titleForNewTask, setTitleForNewTask] = useState<string>('')


    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleForNewTask(event.currentTarget.value)
    }
    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        props.addTask(titleForNewTask.trim())
        setTitleForNewTask('')
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleForNewTask} onChange={onChangeInputHandler} onKeyDown={onKeyDownInputHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(task.id)
                    const onChangeHandler = () => {}
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>Все</button>
                <button onClick={onActiveClickHandler}>Активные</button>
                <button onClick={onCompletedClickHandler}>Выполненные</button>
            </div>
        </div>
    );
};