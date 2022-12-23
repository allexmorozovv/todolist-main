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

