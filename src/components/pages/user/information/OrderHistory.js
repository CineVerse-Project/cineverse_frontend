import { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";
import Notification from "../../../common/ToastNotification";
import { ToastContainer, toast } from "react-toastify";

/**
 * @author HuuNQ
 * 26-05-2023
 * @method OrderHistory
 * @returns none
 */
const OrderHistory = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [orderHistory, setOrderHistory] = useState([]);
    const token = localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : null;
    const [loadMore, setLoadMore] = useState(0);
    const [length, setLength] = useState(0);
    const [currentItem, setCurrentItem] = useState(1);
    const loadMoreHandle = () => {
        if (currentItem < length) {
            setCurrentItem(currentItem + 1);
        } else {
            setCurrentItem(length);
        }
        console.log(currentItem)
    }
    useEffect(() => {
        if (token !== null) {
            UserService.orderHistoryByUsername(username, token)
                .then((data) => {
                    setOrderHistory([...data]);
                    setLength(data.length);
                })
                .catch((error) => {
                    console.log(error);
                    if (error?.response?.status === 400) {
                        Notification.toastErrorNotification(
                            error?.response?.data
                        );
                    } else if (error?.response?.status === 403) {
                        navigate("/");
                        Notification.toastErrorNotification(
                            "Bạn không thể truy cập vào tài nguyên ngày!"
                        );
                    } else if (error?.response?.status === 500) {
                        localStorage.setItem("access_token", "");
                        localStorage.setItem("username", "");
                        localStorage.setItem("roles", []);
                        navigate("/sign-in");
                        toast.warning(
                            "Hết phiên đăng nhập,Vui lòng đăng nhập lại!"
                        );
                        window.location.reload();
                    }
                });
        } else {
            navigate("/sign-in");
        }
    }, []);

    return (
        <div>
            <ToastContainer />
            <div className="mx-auto mt-4">
                <h5
                    className="text-uppercase text-center p-2 text-white"
                    style={{ backgroundColor: "#c23b1a" }}
                >
                    Lịch sử đặt vé
                </h5>
            </div>

            {orderHistory?.length > 0 ?
                orderHistory.map((orderItem) => {
                    return (
                        <div key={orderItem[0]}>
                            <div className="row">
                                <div className="col-9">
                                    <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                                        Mã đặt vé:{" "}
                                        <span style={{ fontWeight: 400 }}>
                                            {orderItem[0]}
                                        </span>
                                    </p>
                                    <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                                        Ngày đặt vé:{" "}
                                        <span style={{ fontWeight: 400 }}>{orderItem[1]}</span>
                                    </p>
                                    <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                                        Trạng thái:{" "}
                                        <span style={{ fontWeight: 400 }}>{orderItem[7] ? 'Đã thanh toán' : "Chưa thanh toán"}</span>
                                    </p>
                                    {orderItem[7] ? <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                                        Mô tả đặt vé:{" "}
                                        <span style={{ fontWeight: 400 }}>
                                            Phim: {orderItem[2]}(c16, Suất chiếu:{" "}
                                            {orderItem[3].split("T")[1]}, Ngày:{" "}
                                            {orderItem[3].split("T")[0]}, Ghế:{" "}
                                            {orderItem[5]}, Rạp: {orderItem[4]}.)
                                        </span>
                                    </p> : ''}

                                </div>
                                {orderItem[7] ?
                                    <div className="col-3">
                                        <div className="mx-auto">
                                            <img
                                                src={orderItem[6]}
                                                alt=""
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    </div> : ''}

                            </div>
                            <hr />
                        </div>
                    )
                }) :
                <div>Không có lịch sử giao dịch</div>
            }
            {
                // (orderHistory)=>{
                //     for(let i = 0 ; i<orderHistory.length;i++){
                //         return (
                //             <div key={orderHistory[i][0]}>
                //                 <div className="row">
                //                     <div className="col-9">
                //                         <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                //                             Mã đặt vé:{" "}
                //                             <span style={{ fontWeight: 400 }}>
                //                                 {orderHistory[i][0]}
                //                             </span>
                //                         </p>
                //                         <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                //                             Ngày đặt vé:{" "}
                //                             <span style={{ fontWeight: 400 }}>{orderHistory[i][1]}</span>
                //                         </p>
                //                         <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                //                             Trạng thái:{" "}
                //                             <span style={{ fontWeight: 400 }}>{orderHistory[i][7] ? 'Đã thanh toán' : "Chưa thanh toán"}</span>
                //                         </p>
                //                         {orderHistory[7] ? <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                //                             Mô tả đặt vé:{" "}
                //                             <span style={{ fontWeight: 400 }}>
                //                                 Phim: {orderHistory[i][2]}(c16, Suất chiếu:{" "}
                //                                 {orderHistory[i][3].split("T")[1]}, Ngày:{" "}
                //                                 {orderHistory[i][3].split("T")[0]}, Ghế:{" "}
                //                                 {orderHistory[i][5]}, Rạp: {orderHistory[i][4]}.)
                //                             </span>
                //                         </p> : ''}

                //                     </div>
                //                     {orderHistory[i][7] ?
                //                         <div className="col-3">
                //                             <div className="mx-auto">
                //                                 <img
                //                                     src={orderHistory[i][6]}
                //                                     alt=""
                //                                     width="100%"
                //                                     height="100%"
                //                                 />
                //                             </div>
                //                         </div> : ''}

                //                 </div>
                //                 <hr />
                //             </div>
                //         )
                //     }
                // }
            }
        </div>
    )
};
export default OrderHistory;
