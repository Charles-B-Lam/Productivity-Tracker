import React, { createContext, useState } from 'react'

const TodoContext = createContext({
    todos: [],
    todoCount: 0,
    addTodo:(todo)=> {},
    delTodo:(id) => {},
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

    const context = {
        todos: userTodos,
        todoCount: userTodos.length,
        addTodo:addTaskHandler,
        delTodo:deleteTaskHandler,
    };

    return <TodoContext.Provider value={context}>
        {props.children}
    </TodoContext.Provider>
}

export default TodoContext;