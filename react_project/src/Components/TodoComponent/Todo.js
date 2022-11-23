import React, { useEffect, useState } from 'react';

import TodoList from './TodoList/TodoList';

const Todo = () => {
  const [error, setError] = useState();
  const [loadedTodos, setLoadedTodos] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/todos');

        const responseData = await response.json();

        if (!response.ok) {
          console.log(responseData.message);
        }
        console.log(responseData);

        setLoadedTodos(responseData);
      } catch (err) {
        setError(err.message);
      }
    };
    sendRequest();
  }, []);
  
  return (
    <React.Fragment>
      {loadedTodos && <TodoList items={loadedTodos} />}
    </React.Fragment>);
};

export default Todo;
