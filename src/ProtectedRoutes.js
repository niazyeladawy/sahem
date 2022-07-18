
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    if (localStorage.getItem('userToken')){
        return true
    }
    else{
        return false;
    }
    // const user = { loggedIn: true };
    // return user && user.loggedIn;
};


const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;