import React, { useEffect, useState } from "react"
import bgImage from '../../../../static/assets/img/backgrounds/form_image.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"
import UserService from "../../../../services/UserService";
import Notification from "../../../common/ToastNotification";
import { ToastContainer,toast } from "react-toastify";
/**
 * @author HuuNQ
 * 26-05-2023
 * @method ForgotPassword
 * @returns none
 */
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email không được bỏ trống!").email("Email chưa hợp lệ!")
        }),
        onSubmit: (e) => {
            submitForm(e)
        }
    })

    const submitForm = (e) => {
        setLoading(true);
        UserService.forgotPassword(e)
            .then((data) => {
                toast.success(data)
                setLoading(false);
                navigate("/sign-in");
            })
            .catch(
                (error) => {
                    toast.error(error?.response?.data);
                    setLoading(false);
                })

    }

    return (
        <div>
            {loading && <div style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: 100 + '%',
                position: 'absolute',
                left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10
            }}>
                <p className="spinner-border text-danger" role="status"></p>
                <p className="text-gray-800 fw-semibold text-danger mt-0" >Đang xử lý...</p>
            </div>}
            <ToastContainer />

            <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="row" style={{ height: '100vh' }}>
                    <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                        <div className="border mx-auto " style={{ borderRadius: '20% 20% / 8% 8%', width: '600px', backgroundColor: 'rgb(255, 255, 255,0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)' }}>
                            <div className="mx-auto" style={{ padding: '20px 36px' }}>
                                <div>
                                    <div className="h4 text-uppercase text-shadow text-center" >Quên mật khẩu</div>
                                </div>
                                <form className=" my-4" onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label"><strong className="" >Email</strong></label>
                                        <input id="username" type="text" name="email" placeholder="Nhập Email" className="input-red"
                                            value={formik.email}
                                            onChange={formik.handleChange} />
                                    </div>
                                    {(formik.errors.email && formik.touched.email) && <p className="text-danger mt-1">{formik.errors.email}</p>}
                                    <div className="text-center mt-2">
                                        <button className="btn-red w-100" type="submit">Gửi yêu cầu</button>
                                    </div>
                                    <hr />
                                    <div>
                                        <Link to="/sign-in" className="text-red">Quay lại trang đăng nhập</Link>
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

export default ForgotPassword;