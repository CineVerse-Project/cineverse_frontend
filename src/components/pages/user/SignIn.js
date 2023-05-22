import React, { useState } from 'react'
import bgImage from '../../../static/assets/img/backgrounds/form_image.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const [login, setLogin] = useState({
        'username': '',
        'password': '',
    })

    const loginForm = async (loginForm) => {
        try{
            const response = await axios.post('http://localhost:8080/api/v1/user/login',loginForm)
            console.log(response);
            localStorage.setItem('token',response.data.token);
            setTimeout(()=>{

            },2000)
            return response.data;
        }catch(error){
            console.log(error)
        }
     
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const headers = new Headers();
        headers.append("Content-type","application/json");
        loginForm(login);
    }

    return (
        <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`,backgroundPosition:'center',backgroundRepeat:'no-repeat' }}>
            <div className="row" style={{ height: 100 + 'vh' }}>
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
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label"><strong className="" >Mật khẩu</strong></label>
                                    <div className="icons">
                                        <input type="password"
                                            className="input-red input-with-icon"
                                            placeholder="Nhập mật khẩu"
                                            id="password"
                                            name="password"
                                            value={login.password}
                                            onChange={(e) => {
                                                setLogin({ ...login, password: e.target.value })
                                            }}
                                        />
                                        <i className="fas fa-eye-slash icon" id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }}></i>
                                    </div>
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
        
    );
}

export default SignIn;