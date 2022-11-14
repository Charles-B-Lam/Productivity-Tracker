import React from 'react'
import { NavLink } from 'react-router-dom'
import { navBarData } from './navBarData'
import './Navbar.css'

import { FcTodoList } from "react-icons/fc";

{/*This is the component for the top nav bar and how it will look */}
const Navbar = () => {
  const activeLink = 'signLogin'
  const normalLink = 'signLogin'
  return (
    <React.Fragment>
        <section>
            <div className="navbar">
              <NavLink to="/"
              className={({ isActive }) =>
              isActive ? activeLink: normalLink}
              >
                <div>
          
                <span className='title'> My To-do List</span>
                </div>
              


              </NavLink>


              <div className="register">
              {
                navBarData.map((item, index) =>{
                  return(
                    <div key={index}>
                      
                      {/*This is for when you click on one of sidebar menu
                        it will pop red meaning you are active in that section.
                      */}
                       <NavLink to={item.path} //navlink let us know whether or not it is "active" when we click.
                        className={({ isActive }) =>
                        isActive ? activeLink: normalLink}

                         >
                        <span>{item.icon}</span>
                        <span className='iconSpan'>{item.title}</span>
                        </NavLink>
                        
                    </div>
                  )
                })
              }
              </div>
            </div>

        </section>
    </React.Fragment>
  )
}

export default Navbar