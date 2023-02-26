import React, {ChangeEvent, FC, useCallback} from 'react';
import {FilterType, TaskType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {AlertDialog} from './AlertDialog';
import {Task} from './Task';

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (todolistId: string, filterValue: FilterType) => void
    addTask: (todolistId: string, titleForNewTask: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDoneNewStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = React.memo((props) => {
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'all')
    }, [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'active')
    }, [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'completed')
    }, [props.changeFilter, props.todolistId])

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])

    const addTask = useCallback((newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [props.changeTodolistTitle, props.todolistId])


    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone)
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
                {tasksForTodolist.map(task =>
                    <Task
                        key={task.id}
                        todolistId={props.todolistId}
                        task={task}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                    />
                )}
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
})


