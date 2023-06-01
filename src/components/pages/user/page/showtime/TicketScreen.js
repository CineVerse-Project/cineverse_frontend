import React, { useEffect, useState } from "react";
import ticketService from "../../../../../services/TicketService";
import { format } from "date-fns";

function TicketScreen({ bookingId }) {
  const [tickets, setTickets] = useState([]);
  console.log(bookingId);
  useEffect(() => {
    const fetchTicketDetailApi = async () => {
      ticketService
        .getTicketDetail(bookingId)
        .then((data) => {
          setTickets(data);
        })
        .catch((error) => console.log(error));
    };
    
    fetchTicketDetailApi();
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
    <>
      {tickets?.length > 0 && (
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
  );
}

export default TicketScreen;