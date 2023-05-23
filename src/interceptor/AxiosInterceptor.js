import axios from "axios";

const AxiosInterceptor = axios.create();

AxiosInterceptor.interceptors.request.use(
    (config)=>{
        const access_token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${access_token}`;
        console.log('request');
        return config},
    (error) => {return Promise.reject(error)}
)

AxiosInterceptor.interceptors.response.use(
    (response)=>{
        console.log('response');
        return response},
    (error) => {
        const status = error.response ? error.response.status : null;

        if(status === 401){
            localStorage.removeItem("token");
            history.go("/sign-in")
        }
        return Promise.reject(error)}
)
