import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../../services/UserService";
import Notification from "../../../common/ToastNotification";
import { ToastContainer, toast } from "react-toastify";

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
        'gender':null,
        'address':'',
        'birthday':'',
        'imgUrl':''
    })
    const navigate = useNavigate();
    const {username} = useParams();
    const token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null
    const loadUserByUsername = (username,token) => {
       UserService.findUserByUsername(username,token)
        .then((data)=>{
            setUser({...data});
        })
        .catch((error)=>{
            console.log(error);
            if(error?.response?.status === 401){
                toast.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!");
                localStorage.setItem("access_token","");
                localStorage.setItem("username","");
                localStorage.setItem("roles",[]);
                navigate("/")
                window.location.reload();
            }else if(error?.response?.status === 403){
                navigate("/")
                toast.error("Bạn không thể truy cập vào tài nguyên này!")
            }else if(error?.response?.status === 500){
                localStorage.setItem("access_token","")
                localStorage.setItem("username","")
                localStorage.setItem("roles",[])
                navigate("/sign-in")
                toast.error("Hết phiên đăng nhập,vui lòng đăng nhập lại!")
                window.location.reload();
            }
        })
    }
    useEffect(()=>{
        loadUserByUsername(username,token);
    },[])
    
    return (
        <div>
            <ToastContainer />
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
                            <input type="text" name="gender" id="" className="form-control" value={user.gender ? 'Nam': 'Nữ'} disabled />
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
                        <div className="border w-75 mx-auto ">
                            <img src={user.imgUrl} alt="" className="w-100" style={{maxHeight:400+'px'}}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default UserInformation;