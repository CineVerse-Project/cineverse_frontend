import React from "react";
import { Outlet } from "react-router-dom";

function HomeUser() {

    const [currentUser,setCurrentUser] = useState();
    const navigate = useNavigate()
    const signOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
        navigate("/sign-in");
    }
    const user = localStorage.getItem('username') ? localStorage.getItem('username') : null ;
    useEffect(()=>{
        setCurrentUser(user);
    },[user]);

    return (
        <>
            {/* <div>HomeUser</div> */}
            <Outlet />
        </>
    );
}

export default HomeUser;
