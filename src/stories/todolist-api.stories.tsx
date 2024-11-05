import { action } from "@storybook/addon-actions";
import { title } from 'process'
import React, {useEffect, useState} from 'react'
import { todoListsAPI } from "../api/todolists-api";

export default {
    title: 'API'
}

const settings= {
    withCredentials: true,
    headers: {
        "API-KEY": "b419d565-31c6-4344-9119-6db9fcd12951"
    }
}
export const GetTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
 todoListsAPI.getTodoLists()
.then( (res) => {
    setState(res.data);

})
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodoList("bla-bla")
        .then( (res) => {
            setState(res.data);
        
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const[state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '7fdd2ca9-7d34-4c63-29bbb7f774c0';
        todoListsAPI.DeleteTodoList(todoListId)
        .then( (res) => {
            setState(res.data);
        
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '6ef200c7-eb06-476f-9b93-65eeeb50af16';
        todoListsAPI.updateTododList(todoListId, "Dimych,hello")
        .then( (res) => {
            setState(res.data);
        
        })
    }, [])
    return
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'ghjgukytglyfluyrf'
 todoListsAPI.getTasks(todoListId)
.then( (res) => {
    setState(res.data);

})
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todoListId, setTodoListId] = useState<string>("")
    
 const deleteTask = () => {
 todoListsAPI.deleteTask(todoListId, taskId)
.then( (res) => {
    setState(res.data);
    })
}
   return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}} />
        <input placeholder={"taskId"}  value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}} />
        <button onClick={deleteTask}>delete task</button>
    </div>
    </div>
}