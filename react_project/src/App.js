import React from "react";
import './App.css';
import TodoComponent from './todo/TodoComponent';
import { TodosContextProvider } from './Todo-Context/todo-context.js'
import TimerFeature from './Components/TimerFeature/TimerFeature';

function App() {
  return (
    <TodosContextProvider>
      {/* <React.Fragment> */}
        <TodoComponent />
      {/* </React.Fragment> */}
      <TimerFeature />
    </TodosContextProvider>
  );
}

export default App;
