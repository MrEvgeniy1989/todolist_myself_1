import {combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from '../reducers/todolists_reducer';
import {tasksReducer} from '../reducers/tasks-reducer';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store