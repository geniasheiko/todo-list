import React, { useReducer, useState } from 'react';
import logo from './logo.svg';
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

const dispatch = useDispatch();
const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists);
const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

  
 function removeTask(id: string, todoListId:string) {
  dispatch(removeTaskAC(id, todoListId));
 }

    
    function addTask(title:string, todoListId: string) {
dispatch(addTaskAC(title, todoListId));
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
      dispatch(changeTaskStatusAC(taskId, isDone,todolistId));
    }       

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
      dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
    
      }

      function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(todoListId, value))
         }
      
      function removeTodoList(id: string) {
        const action = removeTodoListAC(id);
        dispatch(action);
       
    }

    function changeTodoListTitle(id: string, title: string) {
      const action = changeTododListTitleAC(id, title);
      dispatch(action);
    }

   

function addTodoList(title:string) {
const action = addTodoListAC(title);
dispatch(action);

}


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
        todoLists.map( (tl) => {
          let tasksForTodoList = tasks[tl.id];
    if(tl.filter === "completed") {
      tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true); 
    }
    if(tl.filter === "active") {
      tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false); 
    }

          return <Paper style={{ padding: "10px"}}>
          <Todolist
          key={tl.id}
          id={tl.id}
          title={tl.title}
     tasks={ tasksForTodoList}
     removeTask={removeTask}
     changeFilter={changeFilter}
     addTask={addTask}
     changeTaskStatus={changeStatus}
     changeTaskTitle={changeTaskTitle}
     filter = {tl.filter}
     removeTodoList = {removeTodoList}
     changeTodoListTitle={changeTodoListTitle}
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
