import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void


}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    // const mainChangeFilterHandler = (filterValue: FilterValuesType,tlID:string) => {
    //     props.changeFilter(filterValue,tlID)
    // }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>remove todolist</button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const removeTaskHandler = () => props.removeTask(t.id, props.id)
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }

                            return <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                               checked={t.isDone}
                                                                                               onChange={changeTaskStatusHandler}

                            />
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={() => props.changeFilter('all', props.id)}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("active", props.id)}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("completed", props.id)}>Completed
                </button>
            </div>
        </div>
    )
}
