import React, { useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { userReducer } from './state/user-reducer';
import { ChangeTodoListFilterAC, todolistsReducer } from './state/todolists-reducer';

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, dispatchTodolistsReducer] = useReducer(todolistsReducer,[
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]:[ 
      { id: v1(), title: "CSS", isDone: true},
      { id: v1(), title: "JS", isDone: true},
      { id: v1(), title: "React", isDone: false}, 
      { id: v1(), title: "Redux", isDone: false},
      { id: v1(), title: "GraphQLv1", isDone: false}],
     [todoListId2]:[
       { id: v1(), title: "Book", isDone: false},
        { id: v1(), title: "Pen", isDone: true},
       ]
    
  });
  
 function removeTask(id: string, todoListId:string) {
  dispatchToTasksReducer(removeTaskAC(id, todoListId));
 }

    
    function addTask(title:string, todoListId: string) {
dispatchToTasksReducer(addTaskAC(title, todoListId));
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
      dispatchToTasksReducer(changeStatusAC(taskId, isDone,todolistId));
    }       

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
      dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
    
      }

      function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodolistsReducer(changeFilterAC(value,todoListId ))
        
      }
      
      function removeTodoList(id: string) {
        const action = removeTodoListAC(id);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }

    function changeTodoListTitle(id: string, title: string) {
      const action = changeTodoListTitleAC(id, title);
      dispatchToTodoListsReducer(action);
    }

   

function addTodoList(title:string) {
const action = addTodoListAC(title);
dispatchToTasksReducer(action);
dispatchToTodoListsReducer(action);
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



export default AppWithReducers;
