import logo from './logo.svg';
import './App.css';
import TodoComponent from './todo/TodoComponent';
import React, { Fragment } from 'react';
import { TodosContextProvider } from './Todo-Context/todo-context.js'


function App() {
  return (
    <TodosContextProvider>
      {/* <React.Fragment> */}
        <TodoComponent />
      {/* </React.Fragment> */}
    </TodosContextProvider>
  );
}

export default App;
