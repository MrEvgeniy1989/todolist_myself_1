import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import {Delete} from '@mui/icons-material'
import {Task} from 'features/TodolistsList/Todolist/Task/Task'
import {TaskStatuses} from 'api/todolists-api'
import {FilterValuesType, TodolistDomainType} from 'features/TodolistsList/Todolist/todolists-reducer'
import {setTasks, TaskDomainType} from 'features/TodolistsList/Todolist/Task/tasks-reducer'
import {useAppDispatch} from 'hooks/useAppDispatch'

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskDomainType>
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  demo?: boolean
}

export const Todolist = React.memo(function (props: PropsType) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTasks(props.todolist.id))
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.todolist.id, title)
    },
    [props.todolist.id, props.addTask]
  )

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id)
  }
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title)
    },
    [props.todolist.id, props.changeTodolistTitle]
  )

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])

  let tasksForTodolist = props.tasks

  if (props.todolist.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} disabled={props.todolist.entityStatus === 'loading'} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <div>
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </div>
      <div style={{paddingTop: '10px'}}>
        <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler} color={'inherit'}>
          All
        </Button>
        <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler} color={'primary'}>
          Active
        </Button>
        <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler} color={'secondary'}>
          Completed
        </Button>
      </div>
    </div>
  )
})