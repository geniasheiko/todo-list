import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";




const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = configureStore({reducer: rootReducer})
  
    
// @ts-ignore
    window.store = store;

    export default store;