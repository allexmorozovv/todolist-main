import React, {ChangeEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import Task from "../Task";
import {TaskType} from "../Todolist";
import {action} from "@storybook/addon-actions";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        task: {id: '1', title: 'JS', isDone: true},
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: '1', title: 'JS', isDone: false},
};

const TemplateWork: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState(args.task)
    const onClickHandler = () => args.removeTask('1')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        setTask({...task, isDone: newIsDoneValue})
    }
    const onTitleChangeHandler = (newValue: string) => {
        setTask({...task, title: newValue});
    }
    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
};
export const TemplateWorkStory = TemplateWork.bind({
    removeTask: action('removeTask'),
});

