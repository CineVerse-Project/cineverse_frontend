import { Link, Outlet } from "react-router-dom"


/**
 * @author HuuNQ
 * 26-05-2023
 * @method InformationLayout
 * @returns none
 */
const InformationLayout = () => {
    return (
        <div>
            <div className="container" >

                <div className="">
                    <div className="row">
                        <div className="col-4 mt-4" >
                            <div className="w-75 mx-auto mt-4 rounded border" >

                                <ul className="list-group list-group-flush ">
                                    <li className="list-group-item"><h4 className="text-center text-uppercase">Tài khoản</h4></li>
                                    <li className="list-group-item text-uppercase"><Link to="user-information">Thông tin tài khoản</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to="update-information">Cập nhật thông tin</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to="change-password">Thay đổi mật khẩu</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to="order-history">Lịch sử đặt vé</Link></li>
                                    <li className="list-group-item text-uppercase"><Link to="earn-points">Lịch sử tích điểm</Link></li>
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