// import React, {useCallback, useEffect} from 'react'
// import 'app/App.css'
// import {Todolist} from 'Todolist'
// import {AddItemForm} from 'components/AddItemForm/AddItemForm'
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'
// import Container from '@mui/material/Container'
// import Grid from '@mui/material/Grid'
// import Paper from '@mui/material/Paper'
// import {Menu} from '@mui/icons-material'
// import {
//   changeTodolistFilterAC,
//   changeTodolistTitleAC,
//   createTodolist,
//   deleteTodolist,
//   FilterValuesType,
//   setTodolistsTC,
//   TodolistDomainType,
//   updateTodolist,
// } from 'state/todolists-reducer'
// import {changeTaskStatus, changeTaskTitleAC, createTask, deleteTask, updateTaskTitle} from 'state/tasks-reducer'
// import {useSelector} from 'react-redux'
// import {AppRootStateType, useAppDispatch} from 'app/store'
// import {TaskStatuses, TaskType} from 'api/todolists-api'
// import {LinearProgress} from '@mui/material'
// import {RequestStatusType} from 'app/app-reducer'
// import {selectError, selectStatus} from 'app/app.selectors'
// import {ErrorSnackbar} from 'components/ErrorSnackbar/ErrorSnackbar'
//
// export type TasksStateType = {
//   [key: string]: Array<TaskType>
// }
//
// function App() {
//   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
//   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
//   const status = useSelector<AppRootStateType, RequestStatusType>(selectStatus)
//   const error = useSelector<AppRootStateType, string | null>(selectError)
//   const dispatch = useAppDispatch()
//
//   useEffect(() => {
//     dispatch(setTodolistsTC())
//   }, [])
//
//   const removeTask = useCallback((todolistId: string, taskId: string) => {
//     dispatch(deleteTask(todolistId, taskId))
//   }, [])
//
//   const addTask = useCallback((todolistId: string, title: string) => {
//     dispatch(createTask(todolistId, title))
//   }, [])
//
//   const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
//     dispatch(changeTaskStatus(todolistId, taskId, status))
//   }, [])
//
//   const changeTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
//     dispatch(updateTaskTitle(todolistId, id, newTitle))
//   }, [])
//
//   const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
//     dispatch(changeTodolistFilterAC(todolistId, value))
//   }, [])
//
//   const removeTodolist = useCallback((id: string) => {
//     dispatch(deleteTodolist(id))
//   }, [])
//
//   const changeTodolistTitle = useCallback((id: string, title: string) => {
//     dispatch(updateTodolist(id, title))
//   }, [])
//
//   const addTodolist = useCallback(
//     (title: string) => {
//       dispatch(createTodolist(title))
//     },
//     [dispatch]
//   )
//
//   return (
//     <div className='App'>
//       <ErrorSnackbar />
//       <AppBar position='static'>
//         <Toolbar>
//           <IconButton edge='start' color='inherit' aria-label='menu'>
//             <Menu />
//           </IconButton>
//           <Typography variant='h6'>News</Typography>
//           <Button color='inherit'>Login</Button>
//         </Toolbar>
//         {status === 'loading' && <LinearProgress />}
//       </AppBar>
//       <Container fixed>
//         <Grid container style={{padding: '20px'}}>
//           <AddItemForm addItem={addTodolist} />
//         </Grid>
//         <Grid container spacing={3}>
//           {todolists.map(tl => {
//             let allTodolistTasks = tasks[tl.id]
//
//             return (
//               <Grid item key={tl.id}>
//                 <Paper style={{padding: '10px'}}>
//                   <Todolist
//                     id={tl.id}
//                     title={tl.title}
//                     tasks={allTodolistTasks}
//                     removeTask={removeTask}
//                     changeFilter={changeFilter}
//                     addTask={addTask}
//                     changeTaskStatus={changeStatus}
//                     filter={tl.filter}
//                     removeTodolist={removeTodolist}
//                     changeTaskTitle={changeTaskTitle}
//                     changeTodolistTitle={changeTodolistTitle}
//                   />
//                 </Paper>
//               </Grid>
//             )
//           })}
//         </Grid>
//       </Container>
//     </div>
//   )
// }
//
// export default App
import React from 'react'
import './App.css'
import {TodolistsList} from 'features/TodolistsList/TodolistsList'
// import {Login} from 'features/auth/Login'
// import {logoutTC} from 'features/auth/auth.reducer'
// import {selectIsLoggedIn} from 'features/auth/auth.selectors'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'
// import {selectIsLoggedIn} from 'features/auth/auth.selectors'

type PropsType = {
  demo?: boolean
}

function App({demo = false}: PropsType) {
  // const status = useSelector<AppRootStateType, RequestStatusType>(selectStatus)
  // const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized)
  // const isLoggedIn = useSelector(selectIsLoggedIn)

  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (demo || !isLoggedIn) {
  //     return
  //   }
  //   dispatch(setTodolistsTC())
  // }, [])
  //
  // const logoutHandler = useCallback(() => {
  //   // dispatch(logoutTC())
  // }, [])

  // if (!isInitialized) {
  //   return (
  //     <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  // return (
  //   <BrowserRouter>
  //     <div className='App'>
  //       <ErrorSnackbar />
  //       <AppBar position='static'>
  //         <Toolbar>
  //           <IconButton edge='start' color='inherit' aria-label='menu'>
  //             <Menu />
  //           </IconButton>
  //           <Typography variant='h6'>News</Typography>
  //           {/*{isLoggedIn && (*/}
  //           <Button color='inherit' onClick={logoutHandler}>
  //             Log out
  //           </Button>
  //           {/*)}*/}
  //         </Toolbar>
  //         {status === 'loading' && <LinearProgress />}
  //       </AppBar>
  //       <Container fixed>
  //         <Routes>
  //           <Route path={'/'} element={<TodolistsList demo={demo} />} />
  //           {/*<Route path={'/login'} element={<Login />} />*/}
  //         </Routes>
  //       </Container>
  //     </div>
  //   </BrowserRouter>
  // )

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <TodolistsList />
      </Container>
    </div>
  )
}

export default App
