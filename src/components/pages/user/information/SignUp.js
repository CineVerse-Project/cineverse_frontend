import React, { useState } from "react";
import bgImage from '../../../../static/assets/img/backgrounds/form_image.jpg';
import { useFormik } from "formik";
import * as Yup from 'yup'
import UserService from "../../../../services/UserService";
import Notification from "../../../common/ToastNotification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * @author HuuNQ
 * 26-05-2023
 * @method SignUp
 * @returns none
 */
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
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false)
    const formik = useFormik({
        initialValues: {
            fullName: '',
            birthday: '',
            gender: '',
            username: '',
            password: '',
            phoneNumber: '',
            address: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Họ tên không được bỏ trống!")
                .min(3, "Họ tên phải có ít nhất 3 ký tự!")
                .max(50, "Họ tên quá dài!")
                // .matches("/[^0-9~!@#$%^&*()_+=-/?><,.`]*$/", "Họ tên chỉ được chứa các ký tự chữ!")
                ,
            birthday: Yup.date()
                .required("Ngày sinh không được bỏ trống")
                // .matches('/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/', "Ngày này không tồn tại")
                 //.matches('/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/', "Không dúng định dạng ngày tháng năm!")
               ,
            gender: Yup.string()
                .oneOf(["true", "false"], "Vui lòng điền đúng thông tin giới tính")
                .required("Giới tính không được bỏ trống!"),
            username: Yup.string().email("Email không hợp lệ!")
                .required("Email không được bỏ trống!"),
            password: Yup.string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .max(50, "Mật khẩu quá dài!")
                .matches(/^[a-zA-Z0-9!@#$%^&*(),.?:{}|<></>]*$/, 'Mật khẩu không được chứa khoảng trắng!')
                // .matches("[A-Z]*", 'Mật khẩu phải chứa ít nhất 1 ký tự hoa!')
                // .matches('[0-9]*', 'Mật khẩu phải chứa ít nhất 1 ký tự số!')
                // .matches('/[]]*/', 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!')
                .required('Mật khẩu không được bỏ trống'),
            phoneNumber: Yup.string()
                .matches(/^((09)|(07)|(08)|(05)|(03))\d{8}$/, "Số điện thoại không hợp lệ!").required("Số điện thoại không được bỏ trống!"),
            address: Yup.string(),
        }),
        onSubmit: (e) =>{
            UserService.signUp(e)
                .then((data) => {
                    navigate("/sign-in")
                    Notification.toastSuccessNotification(data)
                })
                .catch((error) => {
                    Notification.toastErrorNotification(error?.response?.data);
                })
        }
    })


    return (
        <div>
            <ToastContainer />
            <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="row" style={{ height: '100vh' }}>
                    <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                        <div className="border mx-auto " style={{ borderRadius: '4% 2%', width: '600px', backgroundColor: 'rgb(255, 255, 255,0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)' }}>
                            <div className="mx-auto" style={{ padding: '8px 36px' }}>
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <div className="h4 text-uppercase text-center text-shadow mb-0">Đăng ký</div>
                                    </div>
                                    <div>
                                        <div className="mb-0">
                                            <label htmlFor="fullName" className="form-label m-0"><strong className="">Họ tên</strong></label>
                                            <input id="fullName" name='fullName' value={formik.fullName} onChange={formik.handleChange} type="text" className="input-red" placeholder="Nhập họ tên" />
                                        </div>
                                        { (formik.errors.fullName && formik.touched.fullName) && <p className="text-danger mt-1 mb-0">{formik.errors.fullName}</p>}
                                    </div>

                                    <div className="row mb-0">
                                        <div className="col-6 ps-0">
                                            <label htmlFor="birthday" className="form-label m-0"><strong className="" >Ngày sinh</strong></label>
                                            <input id="birthday" type="date" className="input-red" name='birthday' value={formik.birthday} onChange={formik.handleChange} />
                                            {formik.errors.birthday && formik.touched.birthday && <p className="text-danger mt-1 mb-0">{formik.errors.birthday}</p>}
                                        </div>
                                        <div className="col-6 pe-0">
                                            <label htmlFor="gender" className="form-label m-0"><strong className="" >Giới tính</strong></label>
                                            <div>
                                                <select name="gender" id="" className="select-gender input-red" value={formik.gender} onChange={formik.handleChange}>
                                                    <option id="gender" type="radio" value="" defaultValue='1'>--Chọn giới tính--</option>
                                                    <option id="gender" type="radio" value="true" defaultValue='1'>Nam</option>
                                                    <option id="gender" type="radio" value="false" className="mx-2">Nữ</option>
                                                </select>
                                            </div>
                                            {formik.errors.gender  && formik.touched.gender && <p className="text-danger mt-1 mb-0">{formik.errors.gender}</p>}
                                        </div>

                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="username" className="form-label m-0"><strong className="" >Email</strong></label>
                                        <input id="username" type="text" className="input-red" placeholder="Nhập Email của bạn" name='username' value={formik.username} onChange={formik.handleChange} />
                                        {formik.errors.username && formik.touched.username &&  <p className="text-danger mt-1 mb-0">{formik.errors.username}</p>}
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="password" className="form-label m-0"><strong className="" >Mật khẩu</strong></label>
                                        <div className="icons">
                                            <input type={showPassword ? "text":"password" } className="input-red input-with-icon" placeholder="Nhập mật khẩu" id="password" name='password' value={formik.password} onChange={formik.handleChange} />
                                            <i className={showPassword ? "fas fa-eye-slash icons":"fas fa-eye icons"} id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} onClick={()=>setShowPassword(!showPassword)}></i>
                                        </div>
                                        {formik.errors.password && formik.touched.password && <p className="text-danger mt-1 mb-0">{formik.errors.password}</p>}
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="phone" className="form-label m-0"><strong className="" >Số điện thoại</strong></label>
                                        <input id="phone" type="text" className="input-red" placeholder="Nhập sô điện thoại của bạn" name='phoneNumber' value={formik.phoneNumber} onChange={formik.handleChange} />
                                        {formik.errors.phoneNumber && formik.touched.phoneNumber && <p className="text-danger mt-1 mb-0">{formik.errors.phoneNumber}</p>}
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="address" className="form-label m-0"><strong className="" >Địa chỉ</strong></label>
                                        <input id="address" type="text" className="input-red" placeholder="Nhập địa chỉ của bạn" name='address' value={formik.address} onChange={formik.handleChange} />
                                        {formik.errors.address && formik.touched.address && <p className="text-danger mt-1 mb-0">{formik.errors.address}</p>}
                                    </div>

                                    <strong >Tôi đồng ý với các chính sách của <span className="text-red">CINEVERSE</span> </strong>

                                    <div className="text-center mt-2">
                                        <button className="btn-red w-50 text-uppercase " type="submit">Đăng ký</button>
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