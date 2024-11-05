import axios from "axios"
import { DeleteTodoList, GetTasks } from "../stories/todolist-api.stories"

const settings= {
    withCredentials: true,
    headers: {
        "API-KEY": "b419d565-31c6-4344-9119-6db9fcd12951"
    }
}

const instance = axios.create({
    baseURL: 'http://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodoListType = {
        id: string
        title: string
        addedDate: string
        order: number
   // id: "1490c9b5-19c9-44a8-bc18-5ca4f1597cfa", "title":"Dimych hello", "addedDate": "2020-07-21T15:19:57.343", "ORDER":-11}
}

 type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
 }

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    statrtDate: string
    deadLine: string
    id: string
    todoList: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
   title: string
   description: string
    status: number
    priority: number
    statrtDate: string
    deadLine: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todoListsAPI = {
    getTodoLists() {
        const promise = instance.get<Array<TodoListType>>('todo-lists')
    return promise;
    },

    createTodoList(title: string) {
        const promise = instance.post<ResponseType<{item: TodoListType}>>('todo-lists', { title: title})
    return promise;
    },
    DeleteTodoList(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise;
    },
    updateTododList(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise;
    },

    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`);
        
    },

    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
        },
        updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {}

}