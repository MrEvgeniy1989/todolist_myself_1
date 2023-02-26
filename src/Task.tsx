import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {TaskType} from './AppWithRedux';

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDoneNewStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTask(props.todolistId, props.task.id)
    }, [props.removeTask, props.todolistId, props.task.id])
    const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }, [props.changeTaskStatus, props.todolistId, props.task.id])
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])

    return (
        <li key={props.task.id}
            className={props.task.isDone ? 'is-done' : ''}
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
                    checked={props.task.isDone}
                    onChange={onChangeTaskStatusHandler}
                    color={'primary'}
                />

                <EditableSpan
                    title={props.task.title}
                    callback={changeTaskTitle}
                />
            </div>

            <IconButton onClick={onClickHandler} aria-label="delete">
                <Delete/>
            </IconButton>
            {/*<AlertDialog callback={onClickHandler} dialogTitle={'эту задачу'}/>*/}
        </li>
    )
})