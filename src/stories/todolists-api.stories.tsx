import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todolistAPI.getTodoLists()
        promise.then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('tutu')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const data = "b4c65ed7-8e99-49ad-b44f-d768d2df3c7c"
        todolistAPI.deleteTodolist(data)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8b70c1eb-d484-40fc-8f27-578ca210ac85"
        todolistAPI.updateTodolist(todolistId, 'EEEEEEEEE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2d5fe788-76ef-42f5-bef3-95b24bf0f6c6'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2d5fe788-76ef-42f5-bef3-95b24bf0f6c6'
        todolistAPI.createTask(todolistId, 'milk')
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2d5fe788-76ef-42f5-bef3-95b24bf0f6c6'
        const taskId = 'dc204cf5-8aac-4aea-b76f-ed86dbcd601c'
        todolistAPI.updateTask(todolistId, taskId, 'newTask')
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2d5fe788-76ef-42f5-bef3-95b24bf0f6c6'
        const taskId = 'fd471e2e-2ed7-4ae8-b9e5-bd9da505f231'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
