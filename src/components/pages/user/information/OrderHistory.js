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
    const [dataLength, setDataLength] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [totalPage, setTotalPage] = useState(0);
    const [orderHistory, setOrderHistory] = useState([]);
    // const [loadMore, setLoadMore] = useState(0);
    const token = localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : null;
    const loadMoreOnClick = () => {
        setCurrentPage((prev) => prev + 1);
    };
    useEffect(() => {
        UserService.orderHistoryByUsername(username, token)
            .then((data) => {
                setOrderHistory([...data]);
                setDataLength(data.length);
                if (dataLength % itemsPerPage !== 0) {
                    setTotalPage(Math.round(dataLength / itemsPerPage));
                } else {
                    setTotalPage(dataLength / itemsPerPage);
                }
            })
            .catch((error) => {
                if (error?.response?.status === 400) {
                    Notification.toastErrorNotification(error?.response?.data);
                }
                if (error?.response?.status === 403) {
                    navigate("/sign-in");
                    Notification.toastErrorNotification(
                        "Vui lòng đăng nhập lại!"
                    );
                }
                if (error?.response?.status === 500) {
                    navigate("/sign-in");
                    Notification.toastErrorNotification(
                        "Vui lòng đăng nhập lại!"
                    );
                }
            });
    }, []);
    console.log(orderHistory);

    const orderHistoryMap = orderHistory.map((orderItem) => {
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
                            Trạng thái:{" "}
                            <span style={{ fontWeight: 400 }}>Thành công</span>
                        </p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + "px" }}>
                            Mô tả đặt vé:{" "}
                            <span style={{ fontWeight: 400 }}>
                                Phim: {orderItem[2]}(c16, Suat chieu:{" "}
                                {orderItem[3].split("T")[1]}, Ngay:{" "}
                                {orderItem[3].split("T")[0]}, Ghe:{" "}
                                {orderItem[6]}, Rap: {orderItem[5]}.)
                            </span>
                        </p>
                    </div>

                    <div className="col-3">
                        <div className="mx-auto">
                            <img
                                src={orderItem[7]}
                                alt=""
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    });
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
            {orderHistory?.length > 0 ? (
                <div>{orderHistoryMap}</div>
            ) : (
                <div>Không có lịch sử giao dịch</div>
            )}
        </div>
    );
};
export default OrderHistory;
