import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../auth/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    console.log(auth?.roles);
    return (
        auth?.roles?.indexOf(allowedRoles) !== -1 ?
        <Outlet></Outlet> :
        auth?.username ? <Navigate to="/unauthorized" state={{from:location}} replace/> :
        <Navigate to="/sign-in" replace/>
    )
}

export default RequireAuth;