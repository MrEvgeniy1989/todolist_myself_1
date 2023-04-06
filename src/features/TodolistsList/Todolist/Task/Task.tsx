import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import {Delete} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import {TaskStatuses} from 'api/todolists-api'
import {TaskDomainType} from 'features/TodolistsList/Todolist/Task/tasks-reducer'

type TaskPropsType = {
  task: TaskDomainType
  todolistId: string
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  removeTask: (todolistId: string, taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(() => props.removeTask(props.todolistId, props.task.id), [props.todolistId, props.task.id])

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    },
    [props.todolistId, props.task.id]
  )

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    },
    [props.task.id, props.todolistId]
  )

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color='primary'
        onChange={onChangeHandler}
        disabled={props.task.entityStatus === 'loading'}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} disabled={props.task.entityStatus === 'loading'} />
      <IconButton onClick={onClickHandler} disabled={props.task.entityStatus === 'loading'}>
        <Delete />
      </IconButton>
    </div>
  )
})
