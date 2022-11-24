import React from 'react'
import {Routes, Route} from "react-router-dom"
import Calendar from './Calendar';
import Home from './Home/Home';
import TodoComponent from '../TodoComponent/TodoComponent';
import { TodosContextProvider } from '../TodoComponent/Todo-Context/todo-context';
import TimerFeature from '../TimerComponent/TimerFeature/TimerFeature';



/*
 * This route take you to the content of the side bar menu
 * if you click home, it take you to home content
 */
function Navpage() {
  return (
    <React.Fragment>
        <section>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/tasklist" element={<TodosContextProvider><TodoComponent /></TodosContextProvider>} />
              <Route path="/calendar" element={<Calendar/>} />
              <Route path="/timer" element={<TimerFeature />} />
            </Routes>
        </section>
    </React.Fragment>
  );
}

export default Navpage