import { ChangeTodoListFilterActionType, removeTodoListAC, todolistsReducer } from "./todolists-reducer";
import {v1} from "uuid";
import { FilterValuesType, TodoListType } from "../AppWithRedux";


test('correct todoList should be removed', () => {
    let todoListId1= v1();
    let todoListId2= v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todoListId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});



    test('correct todoList should be removed', () => {
        let todoListId1= v1();
        let todoListId2= v1();
    
    let newTodoListTitle = "New TodoList";
    
        const startState: Array<TodoListType> = [
            {id: todoListId1, title: "What to learn", filter: "all"},
            {id: todoListId2, title: "What to buy", filter: "all"}
        ]
    
        

            const endState = todolistsReducer(startState, removeTodoListAC(todoListId1))   
    
        expect(endState.length).toBe(3);
        expect(endState[2].id).toBe(newTodoListTitle);
        expect(endState[2].filter).toBe("all");
    });

    test('correct todoList should change its name', () => {
        let todoListId1= v1();
        let todoListId2= v1();
    
    let newTodoListTitle = "New TodoList";
    
        const startState: Array<TodoListType> = [
            {id: todoListId1, title: "What to learn", filter: "all"},
            {id: todoListId2, title: "What to buy", filter: "all"}
        ]
    
        const action =  { 
            type: 'CHANGE-TODOLIST-TITLE' as const,
            id: todoListId2, 
            title: newTodoListTitle};

            const endState = todolistsReducer(startState, action);
    
       
        expect(endState[0].id).toBe('What to learn');
        expect(endState[1].filter).toBe(newTodoListTitle);
    });

    test('correct filter todoList should be changed', () => {
        let todoListId1= v1();
        let todoListId2= v1();
    
    let newFilter: FilterValuesType = 'completed';
    
        const startState: Array<TodoListType> = [
            {id: todoListId1, title: "What to learn", filter: "all"},
            {id: todoListId2, title: "What to buy", filter: "all"}
        ]
    
        const action: ChangeTodoListFilterActionType =  { 
            type: 'CHANGE-TODOLIST-FILTER',
            id: todoListId2, 
            filter: newFilter
        };

            const endState = todolistsReducer(startState, action);
    
       
        expect(endState[0].filter).toBe('all');
        expect(endState[1].filter).toBe(newFilter);
    });

   
 


