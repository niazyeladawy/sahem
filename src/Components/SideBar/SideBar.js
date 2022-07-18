import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import InfoContext from '../../InfoContext'

const SideBar = () => {
    let {userInfo,lang} = useContext(InfoContext)
    return (
        <div className="sidebar-wrapper sidebar-theme">
            <nav id="sidebar">
                <div className="profile-info">
                    <figure className="user-cover-image" />
                    <div className="user-info">
                        
                        <Link to='profile'><img src={userInfo&& userInfo.image} alt="avatar" /> <h6 >{userInfo&& userInfo.name}</h6></Link>
                        
                    </div>
                </div>
                <div className="shadow-bottom" />
                <ul className="list-unstyled menu-categories" id="accordionExample">
                    <li className="menu ">
                        <NavLink to="home" href="#dashboard" data-toggle="collapse" aria-expanded="true" className="dropdown-toggle d-none">
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                <span>Dashboard</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6" /></svg>
                            </div>
                        </NavLink>

                    </li>
                    
                    
                    <li className="menu">
                        <NavLink to="home" aria-expanded="false"   className={(navData) => navData.isActive ? "dropdown-toggle activeSideBar" : "dropdown-toggle" }>
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                <span>{lang === "en" ? "Dashboard" : "الرئيسية"}</span>
                            </div>
                        </NavLink>
                    </li>
                    <ul className="list-unstyled menu-categories" id="accordionExample">
                        <li className="menu menu-heading">
                            <div className="heading"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1={5} y1={12} x2={19} y2={12} /></svg><span>{lang === "en" ? "USERS" : "المستخدمين"}</span></div>
                        </li>
                        <li className="menu">
                            <NavLink to="samples" aria-expanded="false"  className={(navData) => navData.isActive ? "activeSideBar dropdown-toggle" : "dropdown-toggle" }>
                                <div >
                                <svg _ngcontent-pqu-c65="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path _ngcontent-pqu-c65="" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle _ngcontent-pqu-c65="" cx="12" cy="7" r="4"></circle></svg>
                                    <span>{lang === "en" ? "Samples" : "العينات"}</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className="menu">
                            <NavLink to="orders" aria-expanded="false"  className={(navData) => navData.isActive ? "activeSideBar dropdown-toggle" : "dropdown-toggle" }>
                                <div >
                                <svg _ngcontent-pqu-c65="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path _ngcontent-pqu-c65="" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle _ngcontent-pqu-c65="" cx="12" cy="7" r="4"></circle></svg>
                                    <span>{lang === "en" ? "Orders" : "الطلبات"}</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className="menu">
                            <NavLink to="tags" aria-expanded="false"  className={(navData) => navData.isActive ? "activeSideBar dropdown-toggle" : "dropdown-toggle" }>
                                <div >
                                <svg _ngcontent-pqu-c65="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path _ngcontent-pqu-c65="" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle _ngcontent-pqu-c65="" cx="12" cy="7" r="4"></circle></svg>
                                    <span>{lang === "en" ? "Tags" : "العلامات"}</span>
                                </div>
                            </NavLink>
                        </li>
                        
                    </ul>
                </ul>
            </nav>
        </div>



    )
}

export default SideBar
