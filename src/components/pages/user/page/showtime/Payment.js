import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ticketService from "../../../../../services/TicketService";
import TicketScreen from "./TicketScreen";
import "./css/payment.css";
import Cookies from "js-cookie";

const Payment = () => {
  const state = useLocation();

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
          await ticketService.saveTicket(bookingId, listArray);
        }
        await ticketService.changePaymentStatus(bookingId);
      }
    };
    fetchPaymentApi();
  }, []);
  return (
    <div>
      {transactionStatus === "00" && <TicketScreen bookingId={bookingId} />}
      {transactionStatus !== "00" && (
        <div>
          <h1>Bạn thanh toán không thành công!!</h1>
          <a className="btn btn-outline-dark" href="/showtime">Mua vé</a>
        </div>
      )}
    </div>
  );
};

export default Payment;
