import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from './App';

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (filterValue: FilterType) => void
    removeTask: (taskId: string) => void
    addTask: (titleForNewTask: string) => void
    changeTaskStatus: (taskId: string, isDoneNewStatus: boolean) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [titleForNewTask, setTitleForNewTask] = useState<string>('')
    const [error, setError] = useState<null | string>(null)


    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleForNewTask(event.currentTarget.value)
    }
    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (titleForNewTask.trim() !== '') {
            props.addTask(titleForNewTask.trim())
        } else {
            setError('Название обязательно!')
        }
        setTitleForNewTask('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input className={error ? 'error' : ''}
                       value={titleForNewTask}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownInputHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>

            <div>
                <button
                    onClick={onAllClickHandler}
                    className={props.filter === 'all' ? 'active-filter' : ''}>Все
                </button>
                <button
                    onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active-filter' : ''}>Активные
                </button>
                <button
                    onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active-filter' : ''}>Выполненные
                </button>
            </div>

        </div>
    );
};