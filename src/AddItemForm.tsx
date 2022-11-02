import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        debugger
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("Field is required")
        }

    }

    return <div>
        <TextField label="enter your task " variant="outlined" value={newTaskTitle}
                   onChange={onNewTaskChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   error={!!error}
                   helperText={error}/>
        <Button onClick={addTask} variant={"contained"} color={"inherit"}
                sx={{width: 60, height: 40, marginLeft: 1}}>+</Button>
        {/*{error && <div className={"error-message"}>{error}</div>}*/}
    </div>

}