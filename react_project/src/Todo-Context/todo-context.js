import React, { createContext, useState } from 'react'

const TodoContext = createContext({
    todos: [],
    todoCount: 0,
    addTodo:(todo)=> {},
    delTodo:(id) => {},
    editTodo:(todo) => {}
});

export function TodosContextProvider(props) {

    const [userTodos, setUserTodos] = useState([]);
    

    function addTaskHandler(todo){
        setUserTodos(userTodos.concat(todo))
    }

    function deleteTaskHandler(id){
        setUserTodos(previousTodos => {
            return previousTodos.filter(todo => todo.id !== id);
        });
    }

    function editTaskHandler(todo){
        
        setUserTodos(prevState => {
            const newTodo =prevState.map(obj => {
                if(obj.id === todo.id){
                    return {...obj, status:todo.status,
                                text:todo.text,
                                start:todo.start,
                                end:todo.end,
                                priority:todo.priority};
                }
                return obj;
            });
            return newTodo;
        })
    }

    const context = {
        todos: userTodos,
        todoCount: userTodos.length,
        addTodo:addTaskHandler,
        delTodo:deleteTaskHandler,
        editTodo:editTaskHandler
    };

    return <TodoContext.Provider value={context}>
        {props.children}
    </TodoContext.Provider>
}

export default TodoContext;