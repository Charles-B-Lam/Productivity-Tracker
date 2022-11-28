import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { navBarData } from './navBarData'
import { SidebarData } from './SidebarData'
import { useLogout } from '../hooks/useLogout'
import './Navbar.css'


{/*This is the component for the top nav bar and how it will look */}
const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  

  const activeLink = 'signLogin'
  const normalLink = 'signLogin'

  //should delete the item in the local storage token
  const handleClick = () =>{
    logout()
  }

  return (
        <header>
            <div className="navbar">
            
            {!user && (
            <Link to="/">
              <span className='title'>To-Do List</span>
            </Link>
            )}

            {user && (
              <div className="menu">
              {
                SidebarData.map((item, index) =>{
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
            )}


              {user && (
              <div className="logout" >
                  <button onClick={handleClick}>Log out</button>
              </div>
              
              )}
              
            {!user && (
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
            )}

            </div>

        </header>
    
  )
}

export default Navbar