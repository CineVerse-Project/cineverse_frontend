import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as Yup from 'yup';
import UserService from "../../../../services/UserService";
import Notification from "../../../common/ToastNotification";


/**
 * @author HuuNQ
 * 26-05-2023
 * @method ChangePassword
 * @returns none
 */
const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null
    const { username } = useParams()
    const [changePassword, setChangePassword] = useState({})
    const navigate = useNavigate();
    const role = localStorage.getItem('roles') ? localStorage.getItem('roles') : null
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Mật khẩu không được bỏ trống')
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .max(50, "Mật khẩu quá dài!")
                .matches(/^[a-zA-Z0-9!@#$%^&*(),.?:{}|<></>]*$/, 'Mật khẩu không được chứa khoảng trắng!'),
            newPassword: Yup.string().required('Mật khẩu không được bỏ trống')
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .max(50, "Mật khẩu quá dài!")
                .matches(/^[a-zA-Z0-9!@#$%^&*(),.?:{}|<></>]*$/, 'Mật khẩu không được chứa khoảng trắng!')
                .notOneOf([Yup.ref('oldPassword'), null], "Mật khẩu mới không được trùng mật khẩu cũ!"),
            confirmNewPassword: Yup.string().required("Xác nhận mật khẩu không được bỏ trống").oneOf([Yup.ref('newPassword'), null], "Xác nhận mật khẩu mới chưa chính xác")
        }),
        onSubmit: (values) => {
            console.log(username);
            UserService.changePassword(values, username,token)
                .then((data) => Notification.toastSuccessNotification(data))
                .catch((error) => {
                    if(error?.response?.status  === 400){
                        Notification.toastErrorNotification(error?.response?.data?.oldPassword)
                    }else if(error?.response?.status === 403){
                        navigate("/sign-in")
                        Notification.toastErrorNotification("Bạn không thể truy cập vào tài nguyên này!")
                    }else if(error?.response?.status === 500){
                        localStorage.removeItem("access_token")
                        localStorage.removeItem("username")
                        localStorage.removeItem("roles")
                        navigate("/sign-in")
                        Notification.toastWarningNotification("Hết phiên đăng nhập,vui lòng đăng nhập lại!")
                    }
                }
                )
        }
    })
    return (<div>
        <div className="mx-auto mt-4" >
            <ToastContainer />
            <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Thay đổi mật khẩu</h5>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Mật khẩu cũ (*)</label>
                            <div className="icons">
                                <input type={showOldPassword ? "text" : "password"}
                                    className="input-red input-with-icon"
                                    placeholder="Nhập mật khẩu"
                                    id="password"
                                    value={formik.oldPassword} onChange={formik.handleChange}
                                    name="oldPassword" />
                                <i className={showOldPassword ? "fas fa-eye icons" : "fas fa-eye-slash icons"} id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} onClick={() => setShowOldPassword(!showOldPassword)} ></i>
                            </div>
                            {formik.errors.oldPassword && <p className="text-danger">{formik.errors.oldPassword}</p>}
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Mật khẩu mới (*)</label>
                            <div className="icons">
                                <input type={showNewPassword ? "text" : "password"} className="input-red input-with-icon"
                                    placeholder="Nhập mật khẩu mới"
                                    id="new-password"
                                    value={formik.newPassword}
                                    onChange={formik.handleChange}
                                    name="newPassword" />
                                <i className={showNewPassword ? "fas fa-eye icons" : "fas fa-eye-slash icons"} id="show_hide_new-password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} onClick={() => setShowNewPassword(!showNewPassword)} ></i>
                            </div>
                            {formik.errors.newPassword && <p className="text-danger">{formik.errors.newPassword}</p>}
                        </div>

                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Xác nhận mật khẩu mới (*)</label>
                            <div className="icons">
                                <input type={showConfirmPassword ? "text" : "password"} className="input-red input-with-icon" placeholder="Nhập xác nhận mật khẩu mới" id="re-new-password"
                                    value={formik.confirmNewPassword}
                                    onChange={formik.handleChange} name="confirmNewPassword" />
                                <i className={showConfirmPassword ? "fas fa-eye icons" : "fas fa-eye-slash icons"} id="show_hide_re-new-password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                            </div>
                            {formik.errors.confirmNewPassword && <p className="text-danger">{formik.errors.confirmNewPassword}</p>}
                        </div>

                    </div>
                </div>
                <div className="mt-2">
                    <button className="btn-red w-25" type="submit">Thay đổi</button>
                </div>
            </form>
        </div>
    </div>)
}
export default ChangePassword;