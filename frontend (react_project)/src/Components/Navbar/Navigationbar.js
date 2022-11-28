import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';

//component
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from '../Sidepage/Home/Home';



//This function is when you click login or signup, it display the
// signup or login on content section
//This page is for the path of top nav bar
function Navigationbar() {
  const {user} = useAuthContext()

  return (
    <React.Fragment>
          <Routes>
              <Route path="/" element={<Home/>}/> 
              <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
              <Route path="/login" element={!user ? <Login/>: <Navigate to="/"/>} />
              
          </Routes>
          
          
    </React.Fragment>
  );
}

export default Navigationbar