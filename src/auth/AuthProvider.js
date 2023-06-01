import {createContext,useState,useEffect} from "react";

const AuthContext = createContext({});
const initState = {
    username:'',
    roles:[],
    token:''
}
const getInitState = () =>{
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : initState.username ;
    const token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : initState.token;
    const roles = [localStorage.getItem("roles") ? localStorage.getItem("roles") : initState.roles];
    return {username,roles,token}
}
export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(getInitState);

    useEffect(()=>{
        localStorage.setItem('username',auth.username);
        localStorage.setItem('roles',auth.roles);
        localStorage.setItem('access_token',auth.token);
    },[initState])

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;