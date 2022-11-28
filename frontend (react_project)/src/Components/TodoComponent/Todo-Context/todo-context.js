import React, { createContext, useState, useEffect } from 'react'

const TodoContext = createContext({
    todos: [],
    todoCount: 0,
    getTodo:() => {},
    addTodo:(todo)=> {},
    delTodo:(id) => {},
    editTodo:(todo) => {}
});

export function TodosContextProvider(props) {

    const [userTodos, setUserTodos] = useState([]);

    // useEffect(() => {
    //     getTasks();
    // }, [userTodos]);

    async function getTasks () {
        try {
          const response = await fetch('/api/todos');
          console.log("request made");
  
          const responseData = await response.json();
  
          if (!response.ok) {
            console.log(responseData.message);
          }
  
          setUserTodos(responseData);
        } 
        catch (err) {
          console.log(err.message);
        }
      };

    async function addTaskHandler(todo){
        try {
            const response = await fetch('/api/todos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                text: todo.text,
                status: todo.status,
                start: todo.start,
                end: todo.end,
                priority: todo.priority
              })
            });
    
            const responseData = await response.json();
            if (!response.ok) {
              console.log(responseData.message);
            }
            console.log(responseData);
            setUserTodos(userTodos.concat(todo));
          } catch (err) {
            console.log(err);
            console.log(err.message || 'Something went wrong, please try again.');
          }
    }

    async function deleteTaskHandler(id){
        try {
            const response = await fetch('/api/todos/'+ id, {
              method: 'DELETE',
              headers: {}
            });
    
            const responseData = await response.json();
            if (!response.ok) {
              console.log(responseData.message);
            }
            console.log(responseData);
          } catch (err) {
            console.log(err);
            console.log(err.message || 'Something went wrong, please try again.');
          }
        setUserTodos(previousTodos => {
            return previousTodos.filter(todo => todo.id !== id);
        });
    }

    async function editTaskHandler(todo){

        try {
            const response = await fetch('/api/todos/'+ todo._id, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id: todo._id,
                text: todo.text,
                status: todo.status,
                start: todo.start,
                end: todo.end,
                priority: todo.priority
              })
            });
    
            const responseData = await response.json();
            if (!response.ok) {
              console.log(responseData.message);
            }
            console.log(responseData);
            
            setUserTodos(prevState => {
                const newTodo = prevState.map(obj => {
                    if(obj.id === todo._id){
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

          } catch (err) {
            console.log(err);
            setError(err.message || 'Something went wrong, please try again.');
          }
        
    }

    const context = {
        todos: userTodos,
        todoCount: userTodos.length,
        getTodo:getTasks,
        addTodo:addTaskHandler,
        delTodo:deleteTaskHandler,
        editTodo:editTaskHandler
    };

    return <TodoContext.Provider value={context}>
        {props.children}
    </TodoContext.Provider>
}

export default TodoContext;