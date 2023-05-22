import React, { useState } from "react";
import bgImage from '../../../static/assets/img/backgrounds/form_image.jpg';

const SignUp = () => {
    const [signUpRequest, setSignUpRequest] = useState({
        'fullName': '',
        'birthday': '',
        'gender': '',
        'email': '',
        'password': '',
        'phoneNumber': '',
        'address': ''
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signUpRequest);
    }


    return (
        <div>
            <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="row" style={{ height: '100vh' }}>
                    <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                        <div className="border mx-auto " style={{ borderRadius: '20% 6% / 4% 10%', width: '600px', backgroundColor: 'rgb(255, 255, 255,0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)' }}>
                            <div className="mx-auto" style={{ padding: '20px 36px' }}>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="h4 text-uppercase text-center text-shadow">Đăng ký</div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="fullName" className="form-label"><strong className="">Họ tên</strong></label>
                                        <input id="fullName" name='fullName' value={signUpRequest.fullName} onChange={(e) => setSignUpRequest({ ...signUpRequest, fullName: e.target.value })} type="text" className="input-red" placeholder="Nhập họ tên" />
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <label htmlFor="birthday" className="form-label"><strong className="" >Ngày sinh</strong></label>
                                            <input id="birthday" type="date" className="input-red" name='birthday' value={signUpRequest.birthday} onChange={(e) => setSignUpRequest({ ...signUpRequest, birthday: e.target.value })} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="gender" className="form-label"><strong className="" >Giới tính</strong></label>
                                            <div>
                                                <select name="gender" id="" className="select-gender input-red"  value={signUpRequest.gender} onChange={(e) => setSignUpRequest({ ...signUpRequest, gender: e.target.value })}>
                                                    <option id="gender" type="radio" value="1" defaultValue='1'>Nam</option>
                                                    <option id="gender" type="radio" value="0" className="mx-2">Nữ</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="username" className="form-label"><strong className="" >Email</strong></label>
                                        <input id="username" type="text" className="input-red" placeholder="Nhập Email của bạn" name='username' value={signUpRequest.username} onChange={(e) => setSignUpRequest({ ...signUpRequest, username: e.target.value })} />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="password" className="form-label"><strong className="" >Mật khẩu</strong></label>
                                        <div className="icons">
                                            <input type="password" className="input-red input-with-icon" placeholder="Nhập mật khẩu" id="password" name='password' value={signUpRequest.password} onChange={(e) => setSignUpRequest({ ...signUpRequest, password: e.target.value })} />
                                            <i className="fas fa-eye-slash icon" id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }}></i>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="phone" className="form-label"><strong className="" >Số điện thoại</strong></label>
                                        <input id="phone" type="text" className="input-red" placeholder="Nhập sô điện thoại của bạn" name='phoneNumber' value={signUpRequest.phoneNumber} onChange={(e) => setSignUpRequest({ ...signUpRequest, phoneNumber: e.target.value })} />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="address" className="form-label"><strong className="" >Địa chỉ</strong></label>
                                        <input id="address" type="text" className="input-red" placeholder="Nhập địa chỉ của bạn" name='address' value={signUpRequest.address} onChange={(e) => setSignUpRequest({ ...signUpRequest, address: e.target.value })} />
                                    </div>

                                    <strong >Tôi đồng ý với các chính sách của <span className="text-red">CINEVERSE</span> </strong>

                                    <div className="text-center mt-2">
                                        <button className="btn-red w-50 text-uppercase ">Đăng ký</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignUp;