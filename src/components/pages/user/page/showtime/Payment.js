import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ticketService from "../../../../../services/TicketService";
import TicketScreen from "./TicketScreen";
import "./css/payment.css";
import Cookies from "js-cookie";

const Payment = () => {
  const state = useLocation();
  const [success, setSuccess] = useState(false);

  const queryParams = new URLSearchParams(state.search);
  const [bookingId] = useState(queryParams.get("vnp_TxnRef"));
  const [transactionStatus] = useState(
    queryParams.get("vnp_TransactionStatus")
  );

  useEffect(() => {
    const listCookie = Cookies.get("ticketItem"); // Lấy danh sách từ cookie
    let listArray;
    if (listCookie) {
      listArray = JSON.parse(listCookie); // Chuyển đổi từ chuỗi JSON sang mảng
    }
    const fetchPaymentApi = async () => {
      if (transactionStatus === "00") {
        if (listArray) {
          await ticketService.saveTicket(bookingId, listArray).then((data) => {
            console.log("OKK!!!");
            setSuccess(true);
          });
        }
        await ticketService.changePaymentStatus(bookingId);
      }
    };
    fetchPaymentApi();
  }, []);
  return (
    <div>
      {transactionStatus === "00" && success && (
        <TicketScreen bookingId={bookingId} />
      )}
      {transactionStatus !== "00" && (
        <div className="ms-5 text-center">
          <h1>Bạn thanh toán không thành công!!</h1>
          <Link to={"/"} className="btn btn-outline-dark">
            Tiếp tục đặt vé
          </Link>
        </div>
      )}
      ;
    </div>
  );
};

export default Payment;
