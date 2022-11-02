import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React JS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false}
        ]
    })


    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string, todolistId: string) => {
        debugger
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
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasks})
        // setTasks([...tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)])
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTd = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTd)
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistsType = {id: v1(), filter: 'all', title: title}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }


    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todo List
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(tl => {
                            let taskForTodolist = tasks[tl.id]

                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={taskForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
