import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMod] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMod(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMod(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return (
        editMode ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

}