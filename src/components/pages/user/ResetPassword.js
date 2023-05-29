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
    const params = new URLSearchParams(window.location.search);
    const token = params.get("reset-password-token");
    const username = params.get("username");
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const formik = useFormik({
        initialValues:{
            newPassword:'',
            confirmNewPassword:''
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Mật khẩu mới không được bỏ trống!").min(6,"Mật khẩu phải từ 6 kí tự!").matches("^[a-zA-Z0-9~!@#$%^&*()_+=-`]*$","Mật khẩu không được chứa khoảng trắng!").max(50,"Mật khẩu quá dài!"),
            confirmNewPassword: Yup.string().required("Xác nhận mật khẩu mới không được bỏ trống!").oneOf([Yup.ref('newPassword'),null],"Xác nhận mật khẩu mới không chính xác!"),
        }),
        onSubmit : (e) =>{
            UserService.resetPassword(e,token,username)
            .then((data)=>{
                Notification.toastSuccessNotification(data);
            })
            .catch((error)=>{
                console.log(error);
                Notification.toastErrorNotification(error?.response?.data)});
        }
    })

    return (
        <div>
        <ToastContainer />
        <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`,backgroundPosition:'center',backgroundRepeat:'no-repeat' }}>
        <div className="row" style={{height:'100vh'}}>
            <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                <div className="border mx-auto " style={{borderRadius:'20% 20% / 8% 8%',width:'600px',backgroundColor: 'rgb(255, 255, 255,0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)'}}>
                    <div className="mx-auto" style={{padding: '20px 36px'}}>
                        <div>
                            <div className="h4 text-uppercase text-shadow text-center" >Tạo mật khẩu mới</div>
                            
                        </div>
                        <form className=" my-4" onSubmit={formik.handleSubmit}>
                            <div className="row">
                            
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                        <div className="icons">
                                            <input type={showPassword ? 'text':'password'} name="newPassword" value={formik.newPassword}
                                            onChange={formik.handleChange}
                                             className="input-red input-with-icon" placeholder="Nhập mật khẩu mới" id="new-password"/>
                                                <i className={showPassword ?  "fas fa-eye-slash icon": "fas fa-eye icon"} id="show_hide_new-password-icon" style={{cursor:'pointer',padding:'12px 12px'}} onClick={()=>setShowPassword(!showPassword)}></i>
                                        </div>
                                        {(formik.errors.newPassword) && <p className='text-danger mt-2'>{formik.errors.newPassword}</p>}
                                        
                                    </div>

                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Xác nhận mật khẩu mới</label>
                                        <div className="icons">
                                            <input type={showConfirmPassword ? 'text':'password'} name="confirmNewPassword" value={formik.confirmNewPassword}
                                            onChange={formik.handleChange}
                                            className="input-red input-with-icon" placeholder="Xác nhận mật khẩu mới" id="re-new-password"/>
                                                <i className={showConfirmPassword ?  "fas fa-eye-slash icon": "fas fa-eye icon"} id="show_hide_re-new-password-icon" style={{cursor:'pointer',padding:'12px 12px'}} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}></i>
                                        </div>
                                    </div>
                                    {(formik.errors.confirmNewPassword) && <p className='text-danger  mt-2'>{formik.errors.confirmNewPassword}</p>}
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <button className="btn-red w-100" type='submit'>Gửi yêu cầu</button>
                            </div>
                            <hr/>
                        </form>
                    </div>
                </div>

            </div>
            </div>
            </div>
            </div>
            );
}

export default ResetPassword;