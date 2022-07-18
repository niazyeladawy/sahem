import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Dashboard/Home/Home';
import './Style.css';
import ProtectedRoutes from './ProtectedRoutes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InfoContext from './InfoContext';
import Samples from './Pages/Dashboard/Samples/Samples';
import Profile from './Pages/Profile/Profile';
import SampleDetails from './Pages/Dashboard/SampleDetails/SampleDetails';
import Orders from './Pages/Orders/Orders';
import EditProfile from './Pages/EditProfile/EditProfile';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import Tags from './Pages/Tags/Tags';
import TagsDetails from './Pages/TagsDetails/TagsDetails';

function App() {


  const [loggedIn, setLoggedIn] = useState(null);
  const [lang, setLang] = useState();
  let [userInfo, setUserInfo] = useState([]);
  const [infoLoading, setInfoLoading] = useState(false);
  let token = localStorage.getItem("userToken")
  const getInfo = async () => {
    setInfoLoading(true);
    let { data } = await axios.get("http://saheembackend.augresearch.com/apiAdmin/Auth_private/my_info", {
      headers: {
        authorization: `${token}`
      }
    });
    setUserInfo(data.data);
    setInfoLoading(false);
  }
 
  const getLang=()=>{
    if (localStorage.getItem("lang")){
      setLang(localStorage.getItem("lang"));
      document.getElementsByTagName("html")[0].setAttribute("lang", localStorage.getItem("lang"));
    }
    else{
      localStorage.setItem("lang","en");
    }
  }
  useEffect(() => {
    getInfo();
    const loggedUser = localStorage.getItem('userToken');
    setLoggedIn(Boolean(loggedUser));
    getLang();
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      {loggedIn !== null &&
        <InfoContext.Provider value={{userInfo,infoLoading,setUserInfo,lang,setLang}}>
          <Routes>
            <Route path='/' element={<Navigate to='/dashboard/home' />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path='home' element={<Home />} />
                <Route path='samples' element={<Samples />} />
                <Route path='profile' element={<Profile />} />
                <Route path='orders' element={<Orders />} />
                <Route path='edit-profile' element={<EditProfile />} />
                <Route path='sample/:id' element={<SampleDetails />} />
                <Route path='order/:id' element={<OrderDetails />} />
                <Route path='tags' element={<Tags />} />
                <Route path='tag/:id' element={<TagsDetails />} />
              </Route>
            </Route>
          </Routes>
        </InfoContext.Provider>
      }


    </div>
  );
}

export default App;
