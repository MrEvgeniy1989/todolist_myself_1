import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {Helmet} from 'react-helmet';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {ColorModeContext} from './ToggleColorMode';
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from './reducers/todolists_reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type FilterType = 'all' | 'active' | 'completed'

export let todolistId1 = v1()

export function AppWithRedux() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists))
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [todolists, tasks])


    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, titleForNewTask: string) => {
        dispatch(addTaskAC(todolistId, titleForNewTask))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDoneNewStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDoneNewStatus))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((todolistId: string, filterValue: FilterType) => {
        dispatch(changeFilterAC(todolistId, filterValue))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])

    return (
        <div className="App">
            <CssBaseline enableColorScheme/>
            <Helmet>
                <title>Todolist</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Helmet>

            <Box>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'center'}}>
                        {/*<IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>*/}

                        {/*<Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1}}
                        >
                            Todolist
                        </Typography>*/}

                        {/*{theme.palette.mode} mode*/}
                        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={'lg'}>
                    <Grid container style={{padding: '20px', justifyContent: 'center'}}>
                        <AddItemForm callback={addTodolist} label={'Новый список задач...'}/>
                    </Grid>

                    <Grid container spacing={3} columns={{xs: 4, sm: 8, md: 12}} justifyContent={'center'}>
                        {todolists.map(todolist => {

                            return (
                                <Grid item key={todolist.id}>
                                    <Paper style={{padding: '1px 30px 30px 30px'}} elevation={12}>
                                        <Todolist
                                            todolistId={todolist.id}
                                            title={todolist.title}
                                            tasks={tasks[todolist.id]}
                                            filter={todolist.filter}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

