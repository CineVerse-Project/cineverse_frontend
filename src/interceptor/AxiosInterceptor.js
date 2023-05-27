import axios from "axios";

export const AxiosInterceptor = axios.create(
    {baseUrl: 'http://localhost:8080/api/v1'}
);
/**
 * @author HuuNQ
 * 26-05-2023
 * @method 
 * @returns none
 */
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
