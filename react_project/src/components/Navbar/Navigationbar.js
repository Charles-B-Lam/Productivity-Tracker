import React from 'react'
import {Routes, Route} from "react-router-dom"
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from '../Sidepage/Home';


//This function is when you click login or signup, it display the
// signup or login on content section
//This page is for the path of top nav bar
function Navigationbar() {
  return (
    <React.Fragment>
        <section>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>

        </section>


    </React.Fragment>
  );
}

export default Navigationbar