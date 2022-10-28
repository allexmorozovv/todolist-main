import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed'},
    ])

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        // let filteredTasks = tasks.filter(t => t.id !== id)
        // setTasks(filteredTasks)
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // const task=tasks.find(t=>t.id===taskId)
        // if (task){
        //     task.isDone=isDone
        // }
        // setTasks([...tasks])
        setTasks([...tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)])
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks
                    if (tl.filter === 'active') {
                        taskForTodolist = tasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodolist = tasks.filter(t => t.isDone === true)
                    }

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={taskForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={tl.filter}


                    />
                })
            }

        </div>
    );
}

export default App;
