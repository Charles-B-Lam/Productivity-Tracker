import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';

//component
import Home from './Home/Home';
import TodoComponent from '../TodoComponent/TodoComponent';
import { TodosContextProvider } from '../TodoComponent/Todo-Context/todo-context';
import { TimesContextProvider } from '../TimerComponent/Timer-Context/timer-context';
import TimerFeature from '../TimerComponent/TimerFeature/TimerFeature';

/*
 * This route take you to the content of the side bar menu
 * if you click home, it take you to home content
 * 
 * Navigate allow us to redirect. If we logout, our page can redirect
 */
function Navpage() {
  const {user} = useAuthContext()
  return (
    <React.Fragment>
        <section>
            <Routes>
              <Route path="/home" element={user ? <Home/> : <Navigate to="/login"/>} />
              <Route path="/tasklist" element={user ? <TodosContextProvider><TodoComponent /></TodosContextProvider> : <Navigate to="/login"/>} />
              {/* <Route path="/timer" element={<TimerFeature />} /> */}
              <Route path="/timer" element={ <TimesContextProvider> <TimerFeature /> </TimesContextProvider> } />
            </Routes>
        </section>
    </React.Fragment>
  );
}

export default Navpage