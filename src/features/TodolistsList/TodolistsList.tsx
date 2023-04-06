import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from 'app/store'
import {TaskStatuses} from 'api/todolists-api'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {createTask, deleteTask, TasksStateType, updateTaskTC} from 'features/TodolistsList/Todolist/Task/tasks-reducer'
import {
  changeTodolistFilterAC,
  createTodolist,
  deleteTodolist,
  FilterValuesType,
  setTodolistsTC,
  TodolistDomainType,
  updateTodolist,
} from 'features/TodolistsList/Todolist/todolists-reducer'
import {selectTasks} from 'features/TodolistsList/Todolist/Task/tasks.selectors'
import {selectTodolists} from 'features/TodolistsList/Todolist/todolists.selectors'
import {useAppDispatch} from 'hooks/useAppDispatch'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(selectTodolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(selectTasks)
  // const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //     if (demo || !isLoggedIn) {
  //         return;
  //     }
  //     const thunk = fetchTodolistsTC()
  //     dispatch(thunk)
  // }, [])
  //
  // if (!isLoggedIn) {
  //     return <Navigate to={"/login"}/>
  // }

  useEffect(() => {
    dispatch(setTodolistsTC())
  }, [])

  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(deleteTask(todolistId, taskId))
  }, [])

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(createTask(todolistId, title))
  }, [])

  const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todolistId, taskId, {status}))
  }, [])

  const changeTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
    dispatch(updateTaskTC(todolistId, id, {title: newTitle}))
  }, [])

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [])

  const removeTodolist = useCallback((id: string) => {
    dispatch(deleteTodolist(id))
  }, [])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(updateTodolist(id, title))
  }, [])

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolist(title))
    },
    [dispatch]
  )

  return (
    <>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{padding: '10px'}}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
