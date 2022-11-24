import React from 'react'
import Navbar from '../Navbar/Navbar'
import Navpage from '../Sidepage/Navpage'
import Sidebar from '../Sidebar/Sidebar'
import Navigationbar from '../Navbar/Navigationbar'
import './MainPage.css'

const MainPage = () => {
  return (
    <React.Fragment>
        {/* For the top heading section */}
        <section>
            <div>
                <Navbar/>
            </div>
        </section>

        {/* For the sidebar section */}
        <section>
            <div className="grid">
                {/*This will be the side bar section col-span-3 bg-black h-screen pl-2'*/}
                <div className="sidebar-section"> <Sidebar/> </div>

                {/* This will be the content section */}
                {/*This will be when you click on one of the tasklist or calendar
                in the sidebar, this is the content
                */}
                <div className="content-section">
                    <Navigationbar/>
                    <Navpage/>
                </div>

            </div>
        </section>

    </React.Fragment>

    
  )
}

export default MainPage