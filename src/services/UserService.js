import axios from "axios";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
/**
 * @author HuuNQ
 * 26-05-2023
 * @method create default url
 * @returns none
 */
axios.defaults.baseURL = "http://localhost:8080/api/v1"

const CLIENT_API = {
    SIGN_IN : "/sign-in",
    ADMIN_SIGN_IN : "/sign-in/admin",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password"
}

const USER_API={
    USER_PROFILE : "/user/",
    UPDATE_USER_PROFILE: "/user/profile-update",
    USER_ORDER_HISTORY:"/user/order-history",
    USER_EARN_POINTS:"/user/earn-points",
    USER_CHANGE_PASSWORD:"/user/change-password"
}


/**
 * @author HuuNQ
 * 26-05-2023
 * @method callAPI
 * @returns none
 */
const UserService = {
    async userSignIn({username,password}){
        try{
            const response = await axios.post(`${CLIENT_API.SIGN_IN}`,{username,password})
            if(response.status === 401){
                throw Error;
            }
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async adminSignIn(data){
        try{
            const response = await axios.post(`${CLIENT_API.ADMIN_SIGN_IN}`,data)
            if(response.status === 401){
                throw Error;
            }
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async signUp(data){
        try{
            const response = await axios.post(`${CLIENT_API.SIGN_UP}`,data)
            if(response.status === 401){
                throw Error;
            }
            return response.data
        }catch(error){
            throw error;
        }
    },
    async forgotPassword({email}){
        try{
            const response = await axios.post(`${CLIENT_API.FORGOT_PASSWORD}`,{username:email})
            if(response.status === 401){
                throw Error
            }
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async resetPassword({newPassword,confirmNewPassword},username,token){
        try{
            const response = await axios.post(`${CLIENT_API.RESET_PASSWORD}`,{newPassword,confirmNewPassword},{
                params : {
                    token :token,
                    username: username
                }
            })
            if(response.status === 401){
                throw Error;
            }
            return response.data;
        }catch(error){
            throw error
        }
    },
    async findUserByUsername(username,token){
        try{
            const response = await axios.get(`${USER_API.USER_PROFILE}${username}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async editUserByUsername(data,token){
        try{
            const response = await axios.patch(`${USER_API.UPDATE_USER_PROFILE}`,data,{
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                })
            if(response.status === 401){
                throw Error;
            }
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async orderHistoryByUsername(username,token){
        try{
            const response = await axios.get(`${USER_API.USER_ORDER_HISTORY}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                params:{
                    username:String(username)
                }
               })
            if(response.status === 401){
                throw Error;
            }
            return response.data;
        }catch(error){
            throw error;
        }
    },
    async getEarnPointsByUsername(username,token){
        try{
            if(token){
                const response = await axios.get(`${USER_API.USER_EARN_POINTS}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    },
                    params:{
                        username:String(username)
                    }
                   })
                if(response.status === 401){
                    throw Error;
                }
                return response.data;
            }
            
        }catch(error){
            throw error;
        }
    },
    async changePassword(changePassword,username,token){
        try{
            const response = await axios.post(`${USER_API.USER_CHANGE_PASSWORD}`,changePassword,{
                headers:{
                        'Authorization':`Bearer ${token}`
                },
                params:{
                    username:String(username)
                }
            })
            if(response.status === 401){
                throw Error
            }
            return response.data;
        }catch(error){
            throw error;
        }
    }
}

export default  UserService;