import React, { ChangeEvent, useCallback } from "react";
import { TaskType } from "../Todolist";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "../EditableSpan";
import { Delete } from "@mui/icons-material";


export type TaskPropsType = {
    task: TaskType;
  todoListId: string;
  removeTask: (taskId: string, todoListId: string) => void;
    changeTaskStatus:(id: string, isDone: boolean) => void;
    changeTaskTitle:(id: string, newTitle: string) => void;
  }
 export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todoListId)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              let newIsDoneValue = e.currentTarget.checked;
             props.changeTaskStatus(props.task.id, newIsDoneValue);
             };
             const onChangeTitleHandler = useCallback((newValue: string) => {
             props.changeTaskTitle(props.task.id, newValue);
             }, [props.task.id, props.changeTaskTitle ]);
            
            return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
              <Checkbox
              onChange={onChangeStatusHandler} 
              checked={props.task.isDone}
              color="primary"/>
             
             <EditableSpan title={props.task.title} 
             onChange={onChangeTitleHandler} />
            <IconButton onClick={onRemoveHandler} >
        <Delete />
      </IconButton>
            </div>
          })
  
