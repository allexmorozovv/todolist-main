import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    // const mainChangeFilterHandler = (filterValue: FilterValuesType,tlID:string) => {
    //     props.changeFilter(filterValue,tlID)
    // }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                            const removeTaskHandler = () => props.removeTask(t.id, props.id)
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (newTitle: string) => {
                                props.changeTaskTitle(t.id, newTitle, props.id)
                            }

                            return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Button onClick={removeTaskHandler}
                                        variant={"contained"}
                                        size={"small"}>
                                    X</Button>
                                <IconButton onClick={removeTaskHandler} disabled color="primary">
                                    <Delete/>
                                </IconButton>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={changeTaskStatusHandler}

                                />
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>

                            </div>
                        }
                    )
                }
            </div>
            <div>
                <Button color={"success"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={() => props.changeFilter('all', props.id)}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={() => props.changeFilter("active", props.id)}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={() => props.changeFilter("completed", props.id)}>Completed
                </Button>
            </div>
        </div>
    )
}


