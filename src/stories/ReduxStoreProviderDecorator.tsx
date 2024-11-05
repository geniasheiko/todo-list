import React from "react"
import { Provider } from "react-redux"
import store, { AppRootState } from "../state/store"
import { combineReducers } from "redux"
import { tasksReducer } from "../state/tasks-reducer"
import { todolistsReducer } from "../state/todolists-reducer"
import { Todolist } from "../Todolist"
import { v1 } from "uuid"
import { configureStore } from "@reduxjs/toolkit"



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todoListId1", title: "What to learn", filter: "all"},
        {id: "todoListId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todoListId1"] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todoListId2"] : [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = configureStore({reducer:rootReducer});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}