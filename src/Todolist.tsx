import React, { useState, ChangeEvent, useCallback } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { title } from 'process';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { changeTodoListFilterAC } from './state/todolists-reducer';
import { Task } from './state/Task';

  export type TaskType = {
    id: string
    title: string
    isDone: boolean
  }

  export type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todoListId: string) => void //ничего
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    tasks: Array<TaskType>
    removeTask:(taskId:string, todoListId: string) => void
    changeTaskStatus:(taskId: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle:(taskId: string, newTitle: string, todoListId: string) => void;
     
    //addTask: (title: string, todoListId: string) => void
  }

 export const Todolist = React.memo(function(props: PropsType) {
 
  const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
  const dispatch = useDispatch();
  
 

const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
  dispatch(changeTodoListFilterAC(todoListId, value));
}, [dispatch]);
  
  const [newTaskTitle, setNewTaskTitle] = useState("");

  


    const removeTodoList = useCallback(() => {
      props.removeTodoList(props.id);
    }, [props.removeTodoList, props.id]);



 const changeTodoListTitle = useCallback((newTitle: string) => {
  props.changeTodoListTitle(props.id, newTitle);
}, [props.changeTodoListTitle, props.id]);

const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter, props.id]);
const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter, props.id]);
const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter, props.id]);



let allTodoListTasks = tasks;
let tasksForTodoList = allTodoListTasks;

if(props.filter === "active") {
  tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false); 
}
if(props.filter === "completed") {
  tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true); 
}


  return <div>
      <h3> <EditableSpan title={props.title}
      onChange={changeTodoListTitle} /> 
      <IconButton onClick={removeTodoList} >
        <Delete />
      </IconButton>
      </h3>
      <AddItemForm addItem={(title) => {
         dispatch(addTaskAC(title, props.id));
      }}/>
      <div>
         {
         props.tasks.map(t =><Task
          key={t.id}
          task={t}
          todoListId={props.id}
          removeTask={(taskId) => dispatch(removeTaskAC(taskId, props.id))}
            changeTaskStatus={(taskId, isDone) =>
              dispatch(changeTaskStatusAC(taskId, isDone, props.id))
            }
            changeTaskTitle={(taskId, newTitle) =>
              dispatch(changeTaskTitleAC(taskId, newTitle, props.id))
            }

          />)
        }
    </div>
    <div style={{paddingTop: "10px"}}>
       <Button variant={ props.filter === 'all' ? "contained" : "text"} 
         onClick={onAllClickHandler}>All</Button>
        <Button color={'primary'} variant={ props.filter === 'active' ? "contained" : "text"}
        onClick={onActiveClickHandler}>Active</Button>
        <Button color={'secondary'} variant={ props.filter === 'completed' ?  "contained" : "text"} 
        onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </div>
  })


 


 