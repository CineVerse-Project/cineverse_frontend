import { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import { useParams, useNavigate, Link } from "react-router-dom";
import Notification from "../../../common/ToastNotification";
import { ToastContainer } from "react-toastify";

/**
 * @author HuuNQ
 * 26-05-2023
 * @method OrderHistory
 * @returns none
 */
const OrderHistory = () => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [dataLength, setDataLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [orderHistory, setOrderHistory] = useState([]);
    // const [loadMore, setLoadMore] = useState(0);
    const token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
    const loadMoreOnClick = () => {
        setCurrentPage((prev) => prev + 1);

    }
    useEffect(() => {
        UserService.orderHistoryByUsername(username, token)
            .then((data) => {
                console.log(data);
                setOrderHistory([...data]);
                setDataLength(data.length);
            })
            .catch((error) => {
                if (error?.response?.status === 400) {
                    Notification.toastErrorNotification(error?.response?.data)
                }
                if (error?.response?.status === 403) {
                    navigate("/sign-in")
                    Notification.toastErrorNotification("Vui lòng đăng nhập lại!")
                }
            })

    }, []);
    const orderHistoryMapLoadMore = () => {
        let loadItem = 2;

        for (let i = 0; i < 2; i++) {
            return <div>
                <div className="row">
                    <div className="col-9">
                        <div>
                            <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mã đặt vé: <span style={{ fontWeight: 400 }}>{orderHistory[i][0]}</span></p>
                            <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Trạng thái: <span style={{ fontWeight: 400 }}>{orderHistory[i][7] > 0 ? 'Thành công' : 'Thất bại'}</span></p>
                            <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mô tả đặt vé: <span style={{ fontWeight: 400 }}>Phim: {orderHistory[i][2]}(c16, Suat chieu: {orderHistory[i][3].split('T')[1]}, Ngay:  {orderHistory[i][3].split('T')[0]}, Ghe: {orderHistory[i][6]}, Rap: {orderHistory[i][5]}.)</span></p>
                            <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Chi phí: <span style={{ fontWeight: 400 }}>{orderHistory[i][7]}</span></p>
                        </div>
                        <div>
                            <div>
                                <button>Chi tiết vé</button>
                            </div>

                            <div>
                                <button>Thanh toán</button>
                            </div>

                        </div>

                    </div>

                    <div className="col-3">
                        <div className="mx-auto w-75">
                            <img src={orderHistory[i][8]} alt="" width="100%" />
                        </div>
                    </div>
                </div>
                <hr />
                {
                    (currentPage < dataLength / 2) && <div>
                        <div className="text-center">
                            <button className="btn-red" onClick={loadMoreOnClick}>Xem thêm</button>
                        </div>
                    </div>
                }
            </div>
        }
    }
    const orderHistoryMap = orderHistory.map((orderItem) => {
        return <div key={orderItem[0]}>

            <div className="row">
                <div className="col-9">
                    <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mã đặt vé: <span style={{ fontWeight: 400 }}>{orderItem[0]}</span></p>
                    <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Trạng thái: <span style={{ fontWeight: 400 }}>{orderItem[7] > 0 ? 'Thành công' : 'Thất bại'}</span></p>
                    <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mô tả đặt vé: <span style={{ fontWeight: 400 }}>Phim: {orderItem[2]}(c16, Suat chieu: {orderItem[3].split('T')[1]}, Ngay:  {orderItem[3].split('T')[0]}, Ghe: {orderItem[6]}, Rap: {orderItem[5]}.)</span></p>
                    <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Chi phí: <span style={{ fontWeight: 400 }}>{orderItem[7]}</span></p>
                    <div>
                        <button>Chi tiết vé</button>
                    </div>

                    <div>
                        <button>Thanh toán</button>
                    </div>
                </div>

                <div className="col-3">
                    <div className="mx-auto">
                        <img src={orderItem[8]} alt="" width="100%" height="100%" />
                    </div>
                </div>
            </div>
            <hr />

        </div>

    })
    return (<div>
        <ToastContainer />
        <div className="mx-auto mt-4" >
            <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Lịch sử đặt vé</h5>
        </div>
        {orderHistory?.length > 0 ?
            <div> {orderHistoryMap}
                <div>
                    <div className="text-center">
                        <button className="btn-red" >Xem thêm</button>
                    </div>
                </div>
            </div>
            :
            <div>
                Không có lịch sử giao dịch
            </div>
        }

    </div>)
}
export default OrderHistory;