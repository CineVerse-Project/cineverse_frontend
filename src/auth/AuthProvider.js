import {createContext,useEffect,useState} from "react";

const AuthContext = createContext({});
const initState = {
    username:'',
    roles:'',
    token:''
}
const getInitState = () =>{
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("access_token");
    const roles = localStorage.getItem("roles");
    return {username,roles,token}
}
export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(getInitState);

    useEffect(()=>{
        localStorage.setItem('username',initState.username);
        localStorage.setItem('roles',initState.roles);
        localStorage.setItem('token',initState.token);
    },[initState])
    console.log(auth);
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;