import React, { useState } from 'react'
import bgImage from '../../../../static/assets/img/backgrounds/form_image.jpg'
import { Link } from 'react-router-dom'
import UserService from '../../../../services/UserService'
import { useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import Notification from '../../../common/ToastNotification'


/**
 * @author HuuNQ
 * 26-05-2023
 * @method SignIn
 * @returns none
 */
const SignIn = () => {
    const [login, setLogin] = useState({
        'username': '',
        'password': '',
    })
    const [errorField,setErrorField] = useState({});
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const headers = new Headers();
        headers.append("Content-type", "application/json");
     
        UserService.userSignIn(login).then((data) => {
            if(localStorage.getItem("access_token")==null){
                localStorage.setItem('access_token',data.token)
            }
            if(localStorage.getItem("username")==null){
                localStorage.setItem('username',data.username)
            }
            if(localStorage.getItem("roles")==null){
                localStorage.setItem('roles',data.roles)
            }

            Notification.toastSuccessNotification("Đăng nhập thành công");
            
            setTimeout(()=>{navigate(`/`)},2000)
            
        })
        .catch(
            (err)=>{
               if(err?.response?.status === 401){
                Notification.toastWarningNotification("Tài khoản chưa chính xác!");
               }else{
                let error = err?.response?.data?.username || err?.response?.data?.password
                Notification.toastErrorNotification(error);
               }
               
            });

    }

    return (
        <div>
        <ToastContainer />
        <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
           
            {/* { <div style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: 100 + 'vh',
                position: 'absolute',
                left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '9000'
            }}>
                <p className="spinner-border text-danger" role="status"></p>
                <p className="text-gray-800 fw-semibold text-danger mt-0" >Đang xử lý...</p>
            </div>} */}

            <div className="row" style={{ height: 100 + 'vh' ,zIndex:1000}}>

                <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                    <div className="border mx-auto " style={{ borderRadius: '20% 20% / 8% 8%', width: 600 + 'px', backgroundColor: 'rgb(255, 255, 255, 0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)' }}>
                        <div className="mx-auto" style={{ padding: '20px 36px' }}>
                            <div>
                                <div className="h4 text-uppercase text-shadow text-center" >Đăng nhập</div>
                                <p>Chúc bạn có những trải nghiệm thú vị tại <strong className="h5 text-shadow">CINEVERSE</strong></p>
                            </div>
                            <form className="my-4" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label"><strong className="" >Email</strong></label>
                                    <input id="username"
                                        type="text"
                                        placeholder="Nhập Email"
                                        className="input-red"
                                        name="username"
                                        value={login.username}
                                        onChange={(e) => {
                                            setLogin({ ...login, username: e.target.value })
                                        }}
                                    
                                    />
                                {errorField && errorField['username'] && <p className="text-danger">{errorField['username']}</p>}
                                </div>
                                
                                
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label"><strong className="" >Mật khẩu</strong></label>
                                    <div className="icons">
                                        <input type={showPassword ? 'text':'password'}
                                            className="input-red"
                                            placeholder="Nhập mật khẩu"
                                            id="password"
                                            name="password"
                                            value={login.password}
                                            onChange={(e) => {
                                                setLogin({ ...login, password: e.target.value })
                                            }}
                                            
                                        />
                                        <i className={showPassword ? "fas fa-eye-slash icons" :"fas fa-eye icons"} id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px' }} onClick={()=>{setShowPassword(!showPassword)}}></i>
                                    </div>
                                    {errorField && errorField['username'] && <p className="text-danger">{errorField['username']}</p>}
                                </div>

                                <div className="my-2 text-center">
                                    <button className="btn-red w-100 my-2">Đăng nhập</button>
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