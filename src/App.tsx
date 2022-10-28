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

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false}
        ]
    })


    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string, todolistId: string) => {
        let filteredTasks = tasks[todolistId].filter(t => t.id !== id)
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
        // setTasks(tasks.filter(t => t.id !== id))
    }

    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks[todolistId]]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const task = tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
        // setTasks([...tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)])
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks[tl.id]

                    if (tl.filter === 'active') {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
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
