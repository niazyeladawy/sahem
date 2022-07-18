import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import InfoContext from '../../InfoContext';


const Navbar = () => {

  let { userInfo, lang, setLang } = useContext(InfoContext);

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    navigate('/login');

  }
  const onClick = (e) => {
    e.preventDefault();
  }

  const changeLang = (lang) => {
    document.getElementsByTagName("html")[0].setAttribute("lang", lang);
    setLang(lang);
    localStorage.setItem("lang",lang);
  }

  return (
    <>
      <div className="header-container fixed-top">
        <header className="header navbar navbar-expand-sm  p-0 justify-content-between">
          <ul className="navbar-nav theme-brand flex-row  text-center">
            <li className="nav-item theme-logo">

              <img src={userInfo && userInfo.image} className="navbar-logo" alt="logo" />

            </li>
            <li className="nav-item theme-text">
              <Link to='/dashboard/home' className="nav-link"> Sahem </Link>
            </li>
            <li className="nav-item toggle-sidebar cursr" >
              <span  onClick={onClick} className="sidebarCollapse" data-placement="bottom"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1={8} y1={6} x2={21} y2={6} /><line x1={8} y1={12} x2={21} y2={12} /><line x1={8} y1={18} x2={21} y2={18} /><line x1={3} y1={6} x2={3} y2={6} /><line x1={3} y1={12} x2={3} y2={12} /><line x1={3} y1={18} x2={3} y2={18} /></svg></span>
            </li>
          </ul>
          <ul className="navbar-item flex-row navbar-dropdown">
            <li className="nav-item dropdown language-dropdown more-dropdown cursr">
              <div className="dropdown  custom-dropdown-icon">
                <span  className="dropdown-toggle btn"  onClick={onClick} role="button" id="langDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/assets/img/ca.png" className="flag-width" alt="flag" /><span>English</span> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg></span>
                <div className="dropdown-menu dropdown-menu-right animated fadeInUp" aria-labelledby="langDropdown">
                  <span className="dropdown-item" data-img-value="ar" data-value="Arabic" onClick={() => changeLang("ar")}><img src="assets/assets/img/sau.png" className="flag-width" alt="flag" /> Arabic</span>
                  <span className="dropdown-item" data-img-value="ca" data-value="English" onClick={() => changeLang("en")}><img src="assets/assets/img/ca.png" className="flag-width" alt="flag" /> English</span>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown user-profile-dropdown  order-lg-0 order-1 cursr">
              <span   onClick={onClick} className="nav-link dropdown-toggle user" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              </span>
              <div className="dropdown-menu position-absolute animated fadeInUp" aria-labelledby="userProfileDropdown">
                <div className="user-profile-section">
                  <div className="media mx-auto">
                    <Link to='profile'> <img src={userInfo && userInfo.image} className="img-fluid mr-2" alt="avatar" /></Link>

                    <div className="media-body">
                      <Link to='profile'><h5>{userInfo && userInfo.name}</h5></Link>
                      {/* <p>Project Leader</p> */}
                    </div>
                  </div>
                </div>
                <div className="dropdown-item">
                  <p className='logout-p'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg> <span onClick={logOut}>{lang === "en" ?"Log Out":"تسجيل الخروج"}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </header>
      </div>
      {/*  END NAVBAR  */}

    </>
  )
}

export default Navbar
