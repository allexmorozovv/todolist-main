import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input value={newTaskTitle}
               onChange={onNewTaskChangeHandler}
               onKeyDown={onKeyDownHandler}
               className={error ? "error" : ""}/>
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>

}