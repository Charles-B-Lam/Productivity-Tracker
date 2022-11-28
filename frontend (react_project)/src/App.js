
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.css';
import MainPage from './Components/Mainpage/MainPage';
import FrontPage from './Components/Mainpage/FrontPage';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainPage/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
