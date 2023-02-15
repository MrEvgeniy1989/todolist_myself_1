import React, {ChangeEvent, FC} from 'react';
import {FilterType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')
    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const addTask = (newTitle: string) => props.addTask(props.id, newTitle)

    const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <AddItemForm callback={addTask}/>

            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(props.id, task.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, task.id, newTitle)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
                            <EditableSpan title={task.title} callback={changeTaskTitle}/>
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
    )
}