import React, { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import  * as Yup from 'yup'
import Notification from "../../../common/ToastNotification";
import { ToastContainer } from "react-toastify";
/**
 * @author HuuNQ
 * 26-05-2023
 * @method UpdateInformation
 * @returns none
 */
const UpdateInformation = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    const { username } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [user,setUser] = useState({
        'customerId':'',
        'email':'',
        'fullName':'',
        'phoneNumber':'',
        'gender':false,
        'address':'',
        'birthday':'',
    });
    const formik = useFormik({
        initialValues:{
            customerId: user.customerId,
            username: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            address: user.address,
            birthday: user.birthday,
            password: '',
            imageUrl: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Họ tên không được bỏ trống!")
                .min(3, "Họ tên phải có ít nhất 3 ký tự!")
                .max(50, "Họ tên quá dài!")
                ,
            birthday: Yup.date()
                .required("Ngày sinh không được bỏ trống")
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
                .required('Vui lòng nhập mật khẩu để xác nhận các thay đổi!'),
            phoneNumber: Yup.string()
                .matches(/^((09)|(07)|(08)|(05)|(03))\d{8}$/, "Số điện thoại không hợp lệ!").required("Số điện thoại không được bỏ trống!"),
            address: Yup.string(),
        }),
        
        enableReinitialize:true,
        onSubmit: (e)=>{
            UserService.editUserByUsername(e,token)
            .then((data)=>{Notification.toastSuccessNotification(data)})
            .catch((error) => {
                if(error?.reponse?.status === 401){
                Notification.toastSuccessNotification(error)
                }else if (error?.response?.status === 403) {
                    navigate("/")
                    Notification.toastErrorNotification("Bạn không thể truy cập vào tài nguyên ngày!")
                }
                else if (error?.response?.status===500){
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("username")
                    localStorage.removeItem("roles")
                    navigate("/sign-in")
                    Notification.toastErrorNotification("Hết phiên đăng nhập,Vui lòng đăng nhập lại!")
                }
            }
                )
        }
    })
    const {values,handleSubmit,handleChange,errors,touched} = formik;
    const setData = async () => {
        try{
            const response = await UserService.findUserByUsername(username, token)
            setUser({...response});
        }catch(error){
            console.log(error);
            Notification.toastErrorNotification(error?.response?.data);
        }
    }
    useEffect(() => {
         setData();
    }, [])

    return (
        <div>
            <ToastContainer />
            <div className="mx-auto mt-4" >
                <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Cập nhật thông tin</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label mt-3 mb-1">Họ tên</label>
                                <input type="text" name="fullName" id="fullName" className="input-red" value={values.fullName}
                                    onChange={handleChange}
                                />
                                {(errors.fullName && touched.fullName) && <p className="text-danger mb-1">{errors.fullName}</p> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender" className="form-label mt-3 mb-1" >Giới tính</label>
                                <select name="gender" value={values.gender} 
                                onChange={handleChange}
                                className="input-red">
                                    <option id="gender" value="true" >Nam</option>
                                    <option id="gender" value="false">Nữ</option>
                                </select>
                                {(errors.gender && touched.gender) && <p className="text-danger mb-1">{errors.gender}</p> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthday" className="form-label mt-3 mb-1">Ngày sinh</label>
                                <input type="date" name="birthday" id="birthday" className="input-red" value={values.birthday}
                                    onChange={handleChange}
                                />
                                {(errors.birthday && touched.birthday) && <p className="text-danger mb-1">{errors.birthday}</p> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="form-label mt-3 mb-1">Số điện thoại</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" className="input-red" value={values.phoneNumber}
                                    onChange={handleChange}
                                />
                                {(errors.phoneNumber && touched.phoneNumber) && <p className="text-danger mb-1">{errors.phoneNumber}</p> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="form-label mt-3 mb-1" >Địa chỉ</label>
                                <input name="address" id="address" className="input-red" value={values.address}
                                    onChange={handleChange}
                                />
                                {(errors.address && touched.address) && <p className="text-danger mb-1">{errors.address}</p> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label mt-3 mb-1">Email</label>
                                <span type="text" name="email" id="username" className="form-control" >{values.username}</span>
                                {(errors.email && touched.email) && <p className="text-danger mb-1">{errors.email}</p> }
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password" className="form-label mt-3 mb-1">Mật khẩu</label>
                                <div className="icons">
                                    <div>
                                    <input type={showPassword ? 'text' : 'password'} className="input-red input-with-icon" 
                                    placeholder="Nhập mật khẩu" id="password" name="password" value={formik.values.password}
                                        onChange={handleChange}
                                    />
                                    <i className={showPassword ? "fas fa-eye icons" : "fas fa-eye-slash icons"} id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} onClick={() => { setShowPassword(!showPassword) }}></i>
                                    </div>
                                    {errors.password && <p className="text-danger mb-1">{errors.password}</p> }
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <p className="text-center text-uppercase">Hình ảnh</p>
                            <hr />
                            <div className="border w-75 mx-auto">
                                <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-100" />
                            </div>
                            <label htmlFor="image_input" className="btn-red mt-4 d-block w-50 mx-auto text-center">Thay đổi ảnh</label>
                            <input type="file" name="imageUrl" id="image_input" value={formik.values.imageUrl} accept="image/*" hidden 
                            onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div >
                        <button className="btn-red w-25 mt-2" type="submit">Lưu thay đổi</button>
                    </div>
                </form>
            </div>



        </div>
    )
}

export default UpdateInformation;