import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  
 function removeTask(id: string, todoListId:string) {
  
   let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter( t => t.id !==id);
    tasksObj[todoListId]= filteredTasks;
   setTasks({...tasksObj});
    }
    
    function addTask(title:string, todoListId: string) {
      let task = { id: v1(), title: title, isDone: false};
      let tasks = tasksObj[todoListId];
      let newTasks = [task, ...tasks];
      tasksObj[todoListId] =newTasks;
      setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
      let tasks = tasksObj[todolistId];
      let task = tasks.find( t => t.id === taskId);
      if(task) {
        task.isDone = isDone;
        setTasks({...tasksObj});
      }
       
      }

      function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find( t => t.id === taskId);
        if(task) {
          task.title = newTitle;
          setTasks({...tasksObj});
        }
         
        }

    function changeFilter(value: FilterValuesType, todoListId: string) {
      let todoList = todoLists.find(tl => tl.id === todoListId);
      if(todoList) {
        todoList.filter = value;
        setTodoList([...todoLists]);
      }
    }
   
   
    
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListType>> ([
      {id: todoListId1, title: "What to learn", filter: "all"},
      {id: todoListId2, title: "What to buy", filter: "all"}
    ]);

    let removeTodoList = (todoListId: string) => {
      let filteredTodoList = todoLists.filter(tl => tl.id !==todoListId)
   setTodoList(filteredTodoList);
   delete tasksObj[todoListId];
   setTasks({...tasksObj});
    }

    function changeTodoListTitle(id: string, newTitle: string) {
      const todoList = todoLists.find(tl => tl.id === id);
      if(todoList) {
        todoList.title = newTitle;
        setTodoList([...todoLists]);
      }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
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

function addTodoList(title:string) {
let todoList: TodoListType = {
  id: v1(),
  filter: 'all',
  title: title
};
setTodoList([todoList, ...todoLists]);
setTasks({
  ...tasksObj,
  [todoList.id]: []
})
}

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
   
      {
        todoLists.map( (tl) => {
          let tasksForTodoList = tasksObj[tl.id];
    if(tl.filter === "completed") {
      tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true); 
    }
    if(tl.filter === "active") {
      tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false); 
    }

          return <Todolist
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
        })
      }
   
    </div>
  );
}



export default App;
