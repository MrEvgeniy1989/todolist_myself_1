import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from './App';

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (todolistId: string, filterValue: FilterType) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, titleForNewTask: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDoneNewStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
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
            props.addTask(props.id, titleForNewTask.trim())
        } else {
            setError('Название обязательно!')
        }
        setTitleForNewTask('')
    }
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolistHandler}>X</button></h3>

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
                    const onClickHandler = () => props.removeTask(props.id, task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>X</button>
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