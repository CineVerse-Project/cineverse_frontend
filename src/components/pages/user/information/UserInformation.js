import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../../services/UserService";
import Notification from "../../../common/ToastNotification";

/**
 * @author HuuNQ
 * 26-05-2023
 * @method UserInformation
 * @returns none
 */
const UserInformation = () => {
    const [user,setUser] = useState({
        'customerId':'',
        'email':'',
        'fullName':'',
        'phoneNumber':'',
        'gender':'',
        'address':'',
        'birthday':''
    })
    const navigate = useNavigate();
    const {username} = useParams();
    const token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null
    const loadUserByUsername = (username,token) => {
       UserService.findUserByUsername(username,token)
        .then((data)=>{
            setUser({...data});
            Notification.toastSuccessNotification("Thao tác thành công!")
        })
        .catch((error)=>{
            console.log(error);
            if(error?.response?.status === 403){
                localStorage.removeItem("access_token")
                localStorage.removeItem("username")
                localStorage.removeItem("roles")
                navigate("/sign-in")
                Notification.toastWarningNotification("Vui lòng đăng nhập!")
            }
        })
    }
    useEffect(()=>{
        loadUserByUsername(username,token);
    },[])
    
    return (
        <div>
            <div className="mx-auto mt-4" >
                <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Thông tin tài khoản</h5>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="" className="form-label mt-3 mb-1">Họ tên</label>
                            <input type="text" name="fullName" id="" className="form-control" defaultValue={user.fullName} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label mt-3 mb-1">Giới tính</label>
                            <input type="text" name="gender" id="" className="form-control" defaultValue={user.gender ? 'Nam': 'Nữ'} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label mt-3 mb-1">Ngày sinh</label>
                            <input type="text" name="birthday" id="" className="form-control" defaultValue={user.birthday} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label mt-3 mb-1">Số điện thoại</label>
                            <input type="text" name="" id="" className="form-control" defaultValue={user.phoneNumber} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label mt-3 mb-1">Email</label>
                            <input type="text" name="" id="" className="form-control" defaultValue={user.email} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label mt-3 mb-1">Địa chỉ</label>
                            <textarea name="" id="" className="form-control" disabled defaultValue={user.address}>
                            </textarea>
                        </div>

                    </div>
                    <div className="col-6">
                        <p className="text-center text-uppercase">Hình ảnh</p>
                        <hr />
                        <div className="border w-75 mx-auto">
                            <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default UserInformation;