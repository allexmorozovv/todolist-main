import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'cfe8e7cb-ed3e-444f-8a33-4dd3fa'
    }
})

export const todolistAPI = {
    getTodoLists() {
        const promise = instance.get<TodolistType[]>('/todo-lists')
        return promise
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string []
    messages: string []
    resultCode: number
}

// type TaskType = {
//     todoListId: string
//     id: string
//     description: string
//     title: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: string
//     addedDate: string
//     deadline: string
//     order: number
// }
// type UpTask={
//     todoListId: "2d5fe788-76ef-42f5-bef3-95b24bf0f6c6"
//     id: "dc204cf5-8aac-4aea-b76f-ed86dbcd601c"
//     description: null
//     title: "newTask"
//     status: 0
//     priority: 1
//     startDate: null
//     addedDate: "2022-12-24T03:51:44.467"
//     deadline: null
//     order: -2
// }

