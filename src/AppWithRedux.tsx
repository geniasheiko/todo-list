import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { userReducer } from './state/user-reducer';
import { addTodoListAC, changeTododListTitleAC, changeTodoListFilterAC, removeTodoListAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
console.log("App is called")

  let todoListId1 = v1();
  let todoListId2 = v1();

const dispatch = useDispatch();
const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists);
const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);


const removeTask = useCallback((taskId: string, todoListId: string) => {
  dispatch(removeTaskAC(taskId, todoListId));
}, [dispatch]);

const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
  dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
}, [dispatch]);

const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
  dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
}, [dispatch]);

const addTodoList = useCallback((title: string) => {
  dispatch(addTodoListAC(title));
},[dispatch]);

const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
  dispatch(changeTodoListFilterAC(todoListId, value));
}, [dispatch])

const removeTodoList = useCallback((id: string) => {
  dispatch(removeTodoListAC(id));
}, [dispatch])

const changeTodoListTitle = useCallback((id: string, title: string) => {
  dispatch(changeTododListTitleAC(id, title));
}, [dispatch])
 
return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
</Typography>
<Button color='inherit'></Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        
<Grid2 container spacing={4} style={ {padding: "20px"} }>

      <AddItemForm addItem={addTodoList} />
     
      {
            todoLists.map(tl => {
              // let allTodoListTasks = tasks[tl.id];
              // let tasksForTodoList = allTodoListTasks;
              let tasksForTodoList = tasks[tl.id];

              if (tl.filter === "active") {
                  tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
              } else if (tl.filter === "completed") {
                  tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
              }
          

      
    
return <Paper style={{ padding: "10px"}}>
          <Todolist
key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={tasksForTodoList}
     changeFilter={changeFilter}
     filter = {tl.filter}
     removeTodoList = {removeTodoList}
     changeTodoListTitle={changeTodoListTitle}
      removeTask={removeTask}
      changeTaskStatus={changeTaskStatus} 
      changeTaskTitle={changeTaskTitle} 
  
     />
     </Paper>
     
        })
      }
      </Grid2>
   </Container>
    </div>
  );
}



export default AppWithRedux;
