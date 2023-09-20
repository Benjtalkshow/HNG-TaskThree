import { Outlet, useLocation, Navigate } from "react-router-dom";
import { auth } from "./firebase";
 
 function PrivateRoute () {
    const location = useLocation();
    return auth.currentUser ? (<Outlet />) : (
        <Navigate to="/" state={{from: location}} replace/>
    )
 };

 export default PrivateRoute;