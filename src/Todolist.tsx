import React, {ChangeEvent, FC} from 'react';
import {FilterType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {AlertDialog} from './AlertDialog';

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
                {/*<IconButton onClick={removeTodolistHandler} aria-label="delete">
                    <Delete/>
                </IconButton>*/}
                <AlertDialog callback={removeTodolistHandler} dialogTitle={'этот список задач'}/>
            </h3>

            <AddItemForm callback={addTask} label={'Новая задача...'}/>

            <ul style={{marginLeft: '0', paddingLeft: '0'}}>
                {props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(props.id, task.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, task.id, newTitle)
                    }

                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done' : ''}
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            listStyleType: 'none',
                            marginLeft: '0',
                            paddingLeft: '0'
                        }}>
                            <div style={{flex: '1'}}>
                                <Checkbox
                                    checked={task.isDone}
                                    onChange={onChangeTaskStatusHandler}
                                    color={'primary'}
                                />

                                <EditableSpan
                                    title={task.title}
                                    callback={changeTaskTitle}
                                />
                            </div>

                            <IconButton onClick={onClickHandler} aria-label="delete">
                                <Delete/>
                            </IconButton>
                            {/*<AlertDialog callback={onClickHandler} dialogTitle={'эту задачу'}/>*/}
                        </li>
                    )
                })}
            </ul>

            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    color={'primary'}>Все
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'success'}>Активные
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'secondary'}>Выполненные
                </Button>
            </div>

        </div>
    )
}


