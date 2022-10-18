import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const onAllChangeFilter = () => props.changeFilter('all')
    const onActiveChangeFilter = () => props.changeFilter('active')
    const onCompletedChangeFilter = () => props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTaskChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const removeTaskHandler = () => props.removeTask(t.id)

                            return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={removeTaskHandler}>X</button>
                                </li>
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={onAllChangeFilter}>All</button>
                <button onClick={onActiveChangeFilter}>Active</button>
                <button onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div>
    )
}