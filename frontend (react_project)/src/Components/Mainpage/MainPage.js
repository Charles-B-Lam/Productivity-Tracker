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
                <Navigationbar/>
                <Navpage/>
            </div>
            <div>
            
            </div>
        </section>

       

    </React.Fragment>

    
  )
}

export default MainPage