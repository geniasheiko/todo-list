import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    }
   export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(error !== null) {
        setError(null);
      }
      if (e.key === "Enter") {
        props.addItem(newTaskTitle);
        setNewTaskTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    }
    }
    const onNewTitlehangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    }
 const addTask = () => {
    
      if (newTaskTitle.trim() !== "") {
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("");
      } else {
        setError("Title is required");
      }
     }
    return <div>
<TextField value={newTaskTitle} 
variant={'outlined'}
label={'Type value'}
    onChange={onNewTitlehangeHandler}
onKeyDown={onKeyPressHandler}
error={ !!error}
helperText={error}
/>
    <IconButton onClick={addTask} color={'primary'}>
      <ControlPoint />
      </IconButton>
   
   
  </div>
  });