import React, { useState } from 'react'
import bgImage from '../../../../static/assets/img/backgrounds/form_image.jpg'
import { Link, useLocation } from 'react-router-dom'
import UserService from '../../../../services/UserService'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'
import Notification from '../../../common/ToastNotification'
import { replace, useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../../../auth/useAuth'
import "react-toastify/dist/ReactToastify.css";

/**
 * @author HuuNQ
 * 26-05-2023
 * @method SignIn
 * @returns none
 */
const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth } = useAuth();
    const [loading,setLoading] = useState(false);
    const formik = useFormik({
        initialValues:{
            'username':'',
            'password':'',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Tài khoản không được bỏ trống!")
                .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+$/, "Email không đúng định dạng!"),
            password: Yup.string()
                .required("Mật khẩu không được bỏ trống")
                .matches(/^[a-zA-Z0-9!@#$%^&*(),.?:{}|<></>]*$/, "Mật khẩu không được chứa khoảng trắng!")
        }),
        onSubmit: (e) => {
            setLoading(true)
            UserService.userSignIn(e)
                .then ((data)=> {
                    const username = data?.username;
                    const token = data?.token;
                    const roles = data?.roles;
                    localStorage.setItem('access_token',token)
                    localStorage.setItem('username',username)
                    localStorage.setItem('roles',roles)
                    setAuth({username,token,roles});
                    toast.success("Đăng nhập thành công");
                    navigate(from,{replace:true});
                })
                .catch ((err) => {
                        if(err?.response?.status === 400){
                            toast.warning("Có lỗi xảy ra!");
                        }else if(err?.response?.status ===401){
                            toast.warning("Tài khoản hoặc mật khẩu không chính xác!");
                        }
                        else{
                            toast.warning(err?.response?.data);
                        }
                     })
                setLoading(false)
                }
    })
    const [showPassword,setShowPassword] = useState(false);

    return (
        <div>
        <ToastContainer />
        <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
           
            { loading && <div style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: 100 + 'vh',
                position: 'absolute',
                left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '9000'
            }}>
                <p className="spinner-border text-danger" role="status"></p>
                <p className="text-gray-800 fw-semibold text-danger mt-0" >Đang xử lý...</p>
            </div>}

            <div className="row" style={{ height: 100 + 'vh' ,zIndex:1000}}>

                <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                    <div className="border mx-auto " style={{ borderRadius: '20% 20% / 8% 8%', width: 600 + 'px', backgroundColor: 'rgb(255, 255, 255, 0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)' }}>
                        <div className="mx-auto" style={{ padding: '20px 36px' }}>
                            <div>
                                <div className="h4 text-uppercase text-shadow text-center" >Đăng nhập</div>
                                <p>Chúc bạn có những trải nghiệm thú vị tại <strong className="h5 text-shadow">CINEVERSE</strong></p>
                            </div>
                            <form className="my-4" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label"><strong className="" >Email</strong></label>
                                    <input id="username"
                                        type="text"
                                        placeholder="Nhập Email"
                                        className="input-red"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange
                                        }
                                    />
                                {(formik.errors.username && formik.touched.username) && <p className="text-danger">{formik.errors.username}</p>}
                                </div>
                                
                                
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label"><strong className="" >Mật khẩu</strong></label>
                                    <div className="icons">
                                        <input type={showPassword ? 'text':'password'}
                                            className="input-red"
                                            placeholder="Nhập mật khẩu"
                                            id="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            
                                        />
                                        <i className={showPassword ? "fas fa-eye-slash icons" :"fas fa-eye icons"} id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px' }} onClick={()=>{setShowPassword(!showPassword)}}></i>
                                    </div>
                                    {(formik.errors.password && formik.touched.password) && <p className="text-danger">{formik.errors.password}</p>}
                                </div>

                                <div className="my-2 text-center">
                                    <button className="btn-red w-100 my-2"  type="submit">Đăng nhập</button>
                                </div>
                            </form>
                            <hr />
                            <div >
                                <span><Link to="/forgot-password"  >Quên mật khẩu?</Link></span>

                            </div>
                            <div>
                                <span><Link to="/sign-up" >Tạo tài khoản?</Link></span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

export default SignIn;