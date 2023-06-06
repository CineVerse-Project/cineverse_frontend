import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"


/**
 * @author HuuNQ
 * 26-05-2023
 * @method InformationLayout
 * @returns none
 */
const InformationLayout = () => {
    const currentUser = localStorage.getItem('username') ? localStorage.getItem('username') : null;
    const [user,setUser] = useState('')
    useEffect(()=>{
        setUser(currentUser);
    },[currentUser])
    return (
        <div>
            <div className="container" >

                <div className="">
                    <div className="row">
                        <div className="col-4 mt-4" >
                            <div className="w-75 mx-auto mt-4 rounded border" >

                                <ul className="list-group list-group-flush ">
                                    <li className="list-group-item"><p className="text-center text-uppercase h4 mb-0"><span className="p-2 d-flex justify-content-center align-item-center">Tài khoản</span></p></li>
                                    <li className="list-group-item text-uppercase"><Link to={user}>Thông tin tài khoản</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to={`update-information/${user}`}>Cập nhật thông tin</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to={`change-password/${user}`}>Thay đổi mật khẩu</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to={`order-history/${user}`}>Lịch sử đặt vé</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-8 mt-4">
                            <Outlet></Outlet>
                        </div>

                    </div>

                    <hr />

                </div>

            </div>
        </div>
    )
}

export default InformationLayout;