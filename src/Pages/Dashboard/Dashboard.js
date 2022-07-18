import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import SideBar from '../../Components/SideBar/SideBar'
import InfoContext from '../../InfoContext'


const Dashboard = () => {
    let { infoLoading } = useContext(InfoContext);

    return (
        <>
        ( <div>
            
                <Navbar />
                <div className="main-container" id="container">
                    <div className="overlay"></div>
                    <div className="search-overlay"></div>
                    <SideBar />
                    <Outlet />
                </div>
    
            </div>)
        
       </>
    )
}

export default Dashboard
