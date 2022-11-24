import React from 'react'
import { SidebarData } from './SidebarData'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'



{/* This is what gonna be on the sidebar such as task list, calender, Timer*/}
const Sidebar = () => {
  const activeLink = 'activeLink'
  const normalLink = 'normalLink'
  return (
    <React.Fragment>
        <section>
            <div className="side-bar">
              {
                SidebarData.map((item, index) =>{
                  return(
                    <div key={index}>
                      
                      {/*This is for when you click on one of sidebar menu
                        it will pop red meaning you are active in that section.
                      */}
                       <NavLink to={item.path}
                        className={({ isActive }) =>
                        isActive ? activeLink: normalLink}

                         >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                        </NavLink>
                        
                    </div>
                  )
                })
              }
            </div>
        </section>
    </React.Fragment>
  )
}

export default Sidebar