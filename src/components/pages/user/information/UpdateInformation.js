import React, { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Notification from "../../../common/ToastNotification";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../../auth/useAuth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../../constants/firebase";
/**
 * @author HuuNQ
 * 26-05-2023
 * @method UpdateInformation
 * @returns none
 */
const UpdateInformation = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    const { username } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loadingScreen,setLoadingScreen]= useState(false);
    const [user, setUser] = useState({
        'customerId': '',
        'email': '',
        'fullName': '',
        'phoneNumber': '',
        'gender': false,
        'address': '',
        'birthday': '',
        'imgUrl': ''
    });
    const formik = useFormik({
        initialValues: {
            customerId: user.customerId,
            username: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            address: user.address,
            birthday: user.birthday,
            password: '',
            imgUrl: user.imgUrl
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
            // imageUrl: Yup.mixed().test(5000000, "File Size is too large", value => value.size <= FILE_SIZE) .test('fileType', "Unsupported File Format", value => SUPPORTED_FORMATS.includes(['image/*']) )
        }),
        enableReinitialize: true,
        onSubmit: (e) => {
            setLoadingScreen(true);
            console.log(loadingScreen);
            let image;
            if (selected != null) {
                image = selected;
                const imgRef = ref(storage, `customer/${e.username + v4()}`);
                uploadBytes(imgRef, image).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        let afterUpload = { ...e, imgUrl: url }
                        UserService.editUserByUsername(afterUpload, token)
                            .then((data) => {
                                setLoadingScreen(false);
                                Notification.toastSuccessNotification(data)
                                
                            })
                            .catch((error) => {
                                if (error?.response?.status === 400) {
                                    Notification.toastErrorNotification("Sai mật khẩu, vui lòng kiểm tra lại!")
                                } else if (error?.status === 401) {
                                    console.log(error?.status)
                                    Notification.toastSuccessNotification(error?.status)
                                } else if (error?.response?.status === 403) {
                                    navigate("/")
                                    Notification.toastErrorNotification("Bạn không thể truy cập vào tài nguyên ngày!")
                                }
                                else if (error?.response?.status === 500) {
                                    localStorage.removeItem("access_token")
                                    localStorage.removeItem("username")
                                    localStorage.removeItem("roles")
                                    navigate("/sign-in")
                                    Notification.toastErrorNotification("Hết phiên đăng nhập,Vui lòng đăng nhập lại!")
                                }
                                setLoadingScreen(false);
                            }
                            )
                    });
                });
            } else {
                UserService.editUserByUsername(e, token)
                            .then((data) => {
                                setLoadingScreen(false);
                                Notification.toastSuccessNotification(data)
                            })
                            .catch((error) => {
                                if (error?.response?.status === 400) {
                                    Notification.toastErrorNotification("Sai mật khẩu, vui lòng kiểm tra lại!")
                                } else if (error?.status === 401) {
                                    console.log(error?.status)
                                    Notification.toastSuccessNotification(error?.status)
                                } else if (error?.response?.status === 403) {
                                    navigate("/")
                                    Notification.toastErrorNotification("Bạn không thể truy cập vào tài nguyên ngày!")
                                }
                                else if (error?.response?.status === 500) {
                                    localStorage.removeItem("access_token")
                                    localStorage.removeItem("username")
                                    localStorage.removeItem("roles")
                                    navigate("/sign-in")
                                    Notification.toastErrorNotification("Hết phiên đăng nhập,Vui lòng đăng nhập lại!")
                                }
                                setLoadingScreen(false);
                            }
                            )
            }
        }
    })
    const setData = async () => {
        try {
            const response = await UserService.findUserByUsername(username, token)
            setUser({ ...response });
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status === 400) {
                Notification.toastErrorNotification(error?.response?.data);
            }
            Notification.toastErrorNotification(error?.response?.data);
        }
    }
    useEffect(() => {
        setData();
    }, [])
    const { values, handleSubmit, handleChange, errors, touched } = formik;
    return (
        <div>
            <ToastContainer />
            {loadingScreen && <div style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: 100 + 'vh',
                position: 'absolute',
                left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10
            }}>
                <p className="spinner-border text-danger" role="status"></p>
                <p className="text-gray-800 fw-semibold text-danger mt-0" >Đang xử lý...</p>
            </div>}
            <div className="mx-auto mt-4" >
                <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Cập nhật thông tin</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label mt-3 mb-1">Họ tên (<span className="text-danger">*</span>)</label>
                                <input type="text" name="fullName" id="fullName" className="input-red" value={values.fullName}
                                    onChange={handleChange}
                                />
                                {(errors.fullName && touched.fullName) && <p className="text-danger mb-1">{errors.fullName}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender" className="form-label mt-3 mb-1" >Giới tính (<span className="text-danger">*</span>)</label>
                                <select name="gender" value={values.gender}
                                    onChange={handleChange}
                                    className="input-red">
                                    <option id="gender" value="true" >Nam</option>
                                    <option id="gender" value="false">Nữ</option>
                                </select>
                                {(errors.gender && touched.gender) && <p className="text-danger mb-1">{errors.gender}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthday" className="form-label mt-3 mb-1">Ngày sinh (<span className="text-danger">*</span>)</label>
                                <input type="date" name="birthday" id="birthday" max={new Date().toISOString().split("T")[0]} className="input-red" value={values.birthday}
                                    onChange={handleChange}
                                />
                                {(errors.birthday && touched.birthday) && <p className="text-danger mb-1">{errors.birthday}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="form-label mt-3 mb-1">Số điện thoại (<span className="text-danger">*</span>)</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" className="input-red" value={values.phoneNumber}
                                    onChange={handleChange}
                                />
                                {(errors.phoneNumber && touched.phoneNumber) && <p className="text-danger mb-1">{errors.phoneNumber}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="form-label mt-3 mb-1" >Địa chỉ</label>
                                <input name="address" id="address" className="input-red" value={values.address}
                                    onChange={handleChange}
                                />
                                {(errors.address && touched.address) && <p className="text-danger mb-1">{errors.address}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label mt-3 mb-1">Email (<span className="text-danger">*</span>)</label>
                                <span type="text" name="email" id="username" className="form-control" >{values.username}</span>
                                {(errors.email && touched.email) && <p className="text-danger mb-1">{errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label mt-3 mb-1">Mật khẩu (<span className="text-danger">*</span>)</label>
                                <div className="icons">
                                    <div>
                                        <input type={showPassword ? 'text' : 'password'} className="input-red input-with-icon"
                                            placeholder="Nhập mật khẩu" id="password" name="password" value={formik.values.password}
                                            onChange={handleChange}
                                        />
                                        <i className={showPassword ? "fas fa-eye icons" : "fas fa-eye-slash icons"} id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} onClick={() => { setShowPassword(!showPassword) }}></i>
                                    </div>
                                    {errors.password && <p className="text-danger mb-1">{errors.password}</p>}
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <p className="text-center text-uppercase">Hình ảnh</p>
                            <hr />
                            {selected === null ? <div className="border w-75 mx-auto">
                                {/* <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-100" /> */}
                                <img src={user.imgUrl} alt={user.imgUrl} className="w-100" style={{maxHeight:400+'px'}}/>
                            </div> : <div className="border w-75 mx-auto">
                                {/* <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-100" /> */}
                                <img src={URL.createObjectURL(selected)} alt={user.imgUrl} className="w-100 " style={{maxHeight:400+'px'}}/>
                            </div>}
                            <label htmlFor="image_input" className="btn-red mt-4 d-block w-50 mx-auto text-center">Thay đổi ảnh</label>
                            <input type="file" name="imgUrl" id="image_input" value={""} accept={"image/png, image/jpeg"} multiple={false} hidden
                                onChange={(e) => {
                                    setSelected(e.target.files[0]);
                                }}
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