import axios from 'axios';
import bgImage from '../../../static/assets/img/backgrounds/form_image.jpg';
import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {ToastContainer} from "react-toastify"
import UserService from '../../../services/UserService';
import Notification from '../../common/ToastNotification';

/**
 * @author HuuNQ
 * 26-05-2023
 * @method ResetPassword
 * @returns none
 */
const ResetPassword = () => {
    const [resetPassword,setResetPassword] = useState({
        'newPassword':'',
        'confirmNewPassword':''
    })
    const params = new URLSearchParams(window.location.search);
    const token = params.get("reset-password-token");
    const username = params.get("username");
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(`http://localhost:8080/api/v1/reset-password?reset-password-token=${token}&username=${username}`,resetPassword);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`,backgroundPosition:'center',backgroundRepeat:'no-repeat' }}>
        <div className="row" style={{height:'100vh'}}>
            <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                <div className="border mx-auto " style={{borderRadius:'20% 20% / 8% 8%',width:'600px',backgroundColor: 'rgb(255, 255, 255,0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)'}}>
                    <div className="mx-auto" style={{padding: '20px 36px'}}>
                        <div>
                            <div className="h4 text-uppercase text-shadow text-center" >Tạo mật khẩu mới</div>
                        </div>
                        <form className=" my-4" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Mật khẩu mới</label>
                                        <div className="icons">
                                            <input type="password" name="newPassword" value={resetPassword.newPassword}
                                            onChange={(e)=>{setResetPassword({...resetPassword,newPassword:e.target.value})}}
                                             className="input-red input-with-icon" placeholder="Nhập mật khẩu mới" id="new-password"/>
                                                <i className="fas fa-eye-slash icon" id="show_hide_new-password-icon" style={{cursor:'pointer',padding:'12px 12px'}}></i>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Xác nhận mật khẩu mới</label>
                                        <div className="icons">
                                            <input type="password" name="confirmNewPassword" value={resetPassword.confirmNewPassword}
                                            onChange={(e)=>{setResetPassword({...resetPassword,confirmNewPassword:e.target.value})}}
                                            className="input-red input-with-icon" placeholder="Xác nhận mật khẩu mới" id="re-new-password"/>
                                                <i className="fas fa-eye-slash icon" id="show_hide_re-new-password-icon" style={{cursor:'pointer',padding:'12px 12px'}}></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn-red w-100">Gửi yêu cầu</button>
                            </div>
                            <hr/>
                        </form>
                    </div>
                </div>

            </div>
            </div>
            </div>
            
            );
}

export default ResetPassword;