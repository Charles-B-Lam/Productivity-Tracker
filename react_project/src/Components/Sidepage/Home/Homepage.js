import React from 'react'
import './Home.css';

function Homepage() {
  return (
    <div className="homeBackground">
        
       <h1 className="welcomeTitle">Welcome to the To-do List React App</h1> 
        
        
        
        <div className="footPage">
            <p>Created by 😎</p>

            <ul className="ourName">
                <li>Thein</li>
                <li>Tommy</li>
                <li>Charles</li>
            </ul>

        </div>

    </div>
  )
}

export default Homepage