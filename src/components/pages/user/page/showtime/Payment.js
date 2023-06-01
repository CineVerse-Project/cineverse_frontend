import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ticketService from "../../../../../services/TicketService";
import TicketScreen from "./TicketScreen";
import "./css/payment.css";
import Cookies from "js-cookie";
import { format } from "date-fns";

const Payment = () => {
  const state = useLocation();

  const queryParams = new URLSearchParams(state.search);
  const [bookingId] = useState(queryParams.get("vnp_TxnRef"));
  const [transactionStatus] = useState(
    queryParams.get("vnp_TransactionStatus")
    );
    const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const listCookie = Cookies.get("ticketItem"); // Lấy danh sách từ cookie
    let listArray;
    if (listCookie) {
      listArray = JSON.parse(listCookie); // Chuyển đổi từ chuỗi JSON sang mảng
    }
    const fetchTicketDetailApi = async () => {
      ticketService
        .getTicketDetail(bookingId)
        .then((data) => {
          setTickets(data);
        })
        .catch((error) => console.log(error));
    };
    const fetchPaymentApi = async () => {
      
  
      if (transactionStatus === "00") {
        if (listArray) {
          await ticketService.saveTicket(bookingId, listArray)
        }
        await ticketService.changePaymentStatus(bookingId);
      }
    };
    fetchPaymentApi();
    fetchTicketDetailApi()
  }, [bookingId, transactionStatus]);

  console.log(bookingId);
  useEffect(() => {
    // const fetchTicketDetailApi = async () => {
    //   ticketService
    //     .getTicketDetail(bookingId)
    //     .then((data) => {
    //       setTickets(data);
    //     })
    //     .catch((error) => console.log(error));
    // };

    // fetchTicketDetailApi();
  }, [bookingId]);
  console.log(tickets);
  const showTimeValue = tickets[0]?.schedule?.scheduleId;
  console.log(showTimeValue);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    if (showTimeValue?.sheduleDateTime) {
      const scheduleDateTime = new Date(showTimeValue?.sheduleDateTime);
      setDateTime(format(scheduleDateTime, "dd/MM/yyyy, HH:mm"));
    }
  }, [showTimeValue]);
  console.log(dateTime);
  return (
    <div>
      {
        transactionStatus === "00" && (
          <>
            {tickets && (
              <div className="box">
                <ul className="left">
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
                <ul className="right">
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
                <div className="ticket">
                  <span className="airline">CineVerse</span>
                  <span className="airline airlineslip">CineVerse</span>
                  <span className="boarding">Cinema ticket</span>
                  <div className="content">
                    <span className="jfk">
                      {tickets[0]?.schedule?.movie?.movieName}
                    </span>
                    <span className="jfk jfkslip">
                      {tickets[0]?.schedule?.movie?.movieName}
                    </span>
                    <div className="sub-content">
                      <span className="watermark">CineVerse</span>
                      <span className="name">
                        Rạp phim
                        <br />
                        <span>
                          {tickets[0]?.schedule?.room?.theater?.theaterName}
                        </span>
                      </span>
                      <span className="flight">
                        Phòng chiếu
                        <br />
                        <span>{tickets[0]?.schedule?.room?.roomName}</span>
                      </span>
                      <span className="lable-seat">
                        Ghế
                        <br />
                        {tickets?.map((ticket, index) => {
                          return (
                            <span key={index}>
                              {ticket?.seat.seatName}
                              {index !== tickets.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </span>
                      <span className="boardingtime">
                        Giờ chiếu
                        <br />
                        {dateTime && <span>{dateTime}</span>}
                      </span>
                      <span className="flight flightslip">
                        Phòng chiếu
                        <br />
                        <span>Rạp 1</span>
                      </span>
                      <span className="lable-seat seatslip">
                        Ghế
                        <br />
                        {tickets?.map((ticket, index) => {
                          return (
                            <span key={index}>
                              {ticket?.seat.seatName}
                              {index !== tickets.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </span>
                      <span className="boardingtime boardingtimeSlip">
                        Giờ chiếu
                        <br />
                        {dateTime && <span>{dateTime}</span>}
                      </span>
                    </div>
                    <span className="address addressSlip">
                      {tickets[0]?.schedule?.room?.theater?.theaterAddress}
                    </span>
                  </div>
                  <div className="barcode" />
                  <div className="barcode slip" />
                </div>
              </div>
            )}
          </>
        )
        // <TicketScreen bookingId={bookingId} />
      }
      {transactionStatus !== "00" && (
        <div className="ms-5">
          <h1>Bạn thanh toán không thành công!!</h1>
          <a className="btn btn-outline-dark" href="/showtime">
            Mua vé
          </a>
        </div>
      )}
    </div>
  );
};

export default Payment;
