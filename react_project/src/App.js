import React from "react";
import './App.css';
import TodoComponent from './todo/TodoComponent';
import { TodosContextProvider } from './Todo-Context/todo-context.js'
import TimerFeature from './Components/TimerFeature/TimerFeature';

function App() {
  return (
    <TodosContextProvider>
      <TodoComponent />
      <TimerFeature />
    </TodosContextProvider>
  );
}

export default App;
