import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../auth/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) ? 
        <Outlet></Outlet> :
        auth?.username ? <Navigate to="/unauthorized" state={{from:location}} replace/> :
        <Navigate to="/sign-in" state={{from:location}} replace/>
    )
}

export default RequireAuth;