import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ticketService from "../../../../../services/TicketService";
import "./css/showSeatScreen.css";
import { format } from "date-fns";
import { toast } from "react-toastify";
import VND from "./FormatMoney";
import { useNavigate } from "react-router-dom";

function ShowSeatScreen() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const sheduleDateTime = queryParam.get("sheduleDateTime");
  const roomId = queryParam.get("roomId");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const selected = location.state && location.state.selectedSeats;
  console.log(location);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCreateBookingApi = async () => {
      const promises = selected?.map((seat) =>
        ticketService.findTicketByTicketId(seat.ticketId)
      );
      try {
        const responses = await Promise.all(promises);
        const tickets = responses.map((response) => response);
        let seatList = [];
        tickets.forEach((ticket, index) => {
          console.log(ticket);
          if (!ticket?.booked) {
            seatList.push(ticket);
          }
        });
        setSelectedSeats([...seatList]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreateBookingApi();
  }, [selected]);

  const isSeatSelected = (seat) => {
    return selectedSeats?.map((s) => s?.ticketId).includes(seat?.ticketId);
  };
  useEffect(() => {
    const fetchGetSeatByScheduleApi = async () => {
      ticketService
        .getSeatBySchedule(roomId, sheduleDateTime)
        .then((data) => {
          setSeats(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchGetSeatByScheduleApi();
  }, []);

  const handleSelectSeat = (seat) => {
    const index = selectedSeats
      ?.map((s) => s?.ticketId)
      .indexOf(seat?.ticketId);
    console.log(index);
    if (index === -1 && selectedSeats.length < 8) {
      setSelectedSeats([...selectedSeats, seat]);
    } else if (index !== -1) {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
    } else {
      toast.warning("Chỉ được chọn tối đa 8 ghế!!!");
    }
  };
  const seatsPerColumn = seats[0]?.seat.room.seatRowNumber;
  const seatsPerRow = seats[0]?.seat.room.seatColumnNumber;
  console.log(seatsPerColumn)
  console.log(seatsPerRow)
  const renderSeat = () => {
    const rows = [];
    const seatRows = Array.from(
      { length: Math.ceil(seatsPerColumn / seatsPerRow) },
      (_, index) => {
        const rowStart = index * seatsPerRow;
        const rowEnd = Math.min(rowStart + seatsPerRow, seatsPerColumn);
        return Array.from({ length: rowEnd - rowStart }, (_, i) =>
          String.fromCharCode(65 + rowStart + i)
        );
      }
    ).flat();

    seatRows.forEach((row) => {
      const rowSeats = [];
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatName = `${row}${i.toString().padStart(1)}`;

        rowSeats.push(
          <button
            key={seatName}
            className={`seat ${
              seats.find((s) => s.seat?.seatName === seatName)?.seat?.seatType
                ?.seatTypeId === "ST-0002"
                ? "seat-vipprime active"
                : "seat-standard active"
            }
            ${
              seats.find((s) => s.seat?.seatName === seatName)?.booked === true
                ? "seat-disable disable"
                : ""
            }
               ${
                 isSeatSelected(
                   seats.find((s) => s.seat?.seatName === seatName)
                 )
                   ? "seat-cheked active"
                   : ""
               }
              `}
            value={seatName}
            onClick={() => {
              handleSelectSeat(
                seats.find((s) => s.seat?.seatName === seatName)
              );
            }}
          >
            {seatName}
          </button>
        );
      }
      rows.push(
        <div key={row} className="rowSeats">
          {rowSeats}
        </div>
      );
    });
    return (
      <div className="d-flex align-items-center mt-3 mb-3 group__seat">
        {rows}
      </div>
    );
  };

  const durationInMinutes = seats[0]?.schedule.movie.duration;
  const dateStart = new Date(sheduleDateTime);

  // Lấy thời gian hiện tại của đối tượng Date
  const currentTime = dateStart.getTime();
  const newTime = currentTime + durationInMinutes * 60 * 1000;

  const [endDateTime, setEndDayTime] = useState("");
  useEffect(() => {
    if (newTime) {
      const newDate = new Date(newTime);
      setEndDayTime(format(newDate, "dd/MM/yyyy, HH:mm"));
    }
  }, [newTime]);

  const startDateTime = format(dateStart, "dd/MM/yyyy, HH:mm");

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      selectedSeats?.reduce((total, item) => total + Number(item.price), 0)
    );
  }, [selectedSeats]);

  const handleGoBack = () => {
    navigate("/showtime?movieId=" + seats[0]?.schedule.movie.movieId);
  };

  const handelNextCheckOut = () => {
    if (selectedSeats.length === 0) {
      alert("Phải chọn ghế trước khi đi tiếp!!!");
    } else {
      navigate("/checkout", { state: { selectedSeats: selectedSeats } });
    }
  };

  return (
    <div className="col-main ps-3 text__size">
      <div className="booking-progress">
        <div className="page-title">
          <h1>Booking Online</h1>
        </div>
        <div className="top-content">
          <ol className="products-list" id="products-list">
            <li className="item">
              <div className="product-shop">
                <div className="f-fix">
                  <div className="product-primary">
                    <p>
                      <span>{seats[0]?.seat.room.theater.theaterName}</span> |
                      <span>{seats[0]?.seat.room.roomName}</span>| Số ghế (
                      <em>{seats?.length} </em>/ <span>{seats?.length}</span>)
                    </p>
                    <p>
                      <span>{startDateTime}</span> ~ {endDateTime}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
        <div className="main-content">
          <ul
            className="progress"
            style={{ position: "relative", height: 660 }}
          >
            <li
              className="booking-step cycle-slide cycle-slide-active"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 100,
                opacity: 1,
                display: "block",
                visibility: "visible",
              }}
            >
              <label className="h1">Người / Ghế</label>
              <div className="ticketbox">
                <div className="screen"></div>
                {renderSeat()}
              </div>
              <div className="ticketbox-notice">
                <div className="iconlist">
                  <div className="icon">
                    <i className="fa-solid fa-square text-danger p-2" />
                    Checked
                  </div>
                  <div className="icon">
                    <i className="fa-solid fa-square text-body-secondary p-2" />
                    Đã chọn
                  </div>
                </div>
                <div className="iconlist">
                  <div className="icon" title="Standard">
                    <i className="fa-regular fa-square text-danger p-2" />
                    Thường
                  </div>
                  <div className="icon" title="VIP(Prime)">
                    <i className="fa-regular fa-square text-success p-2" />
                    VIP
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="group__ticket">
          <div className="bottom-content">
            <div className="format-bg-top">
              <button
                className="btn-left"
                onClick={handleGoBack}
                title="Previous"
              >
                Previous
              </button>
              <div className="minicart-wrapper">
                <ul>
                  <li className="item first">
                    <div className="product-details">
                      <table className="info-wrapper">
                        <colgroup>
                          <col width="40%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src={seats[0]?.schedule.movie.imageUrl}
                                alt="img"
                              />
                            </td>
                            <td>
                              <table className="info-wrapper">
                                <tbody>
                                  <tr>
                                    <td className="label">
                                      {seats[0]?.schedule.movie.movieName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="label">2D</td>
                                  </tr>
                                  <tr>
                                    <td className="label">C16</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="item">
                    <div className="product-details">
                      <table className="info-wrapper">
                        <tbody>
                          <tr>
                            <td className="label">Rạp</td>
                            <td>{seats[0]?.seat.room.theater.theaterName}</td>
                          </tr>
                          <tr>
                            <td className="label">Suất chiếu</td>
                            <td>{startDateTime}</td>
                          </tr>
                          <tr>
                            <td className="label">Phòng chiếu</td>
                            <td>{seats[0]?.seat.room.roomName}</td>
                          </tr>
                          <tr>
                            <td className="label">Ghế</td>
                            <td className="data">
                              <span style={{ clear: "both", float: "left" }}>
                                {selectedSeats?.map((item, index) => {
                                  return (
                                    <>
                                      <span>
                                        {item.seat?.seatName}
                                        {index !== selectedSeats.length - 1 &&
                                          ", "}
                                      </span>
                                    </>
                                  );
                                })}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="item">
                    <div className="product-details">
                      <table className="info-wrapper">
                        <thead className="block-price">
                          <tr>
                            <td className="label">Tổng</td>
                            <td className="price" colSpan={2}>
                              {VND.format(totalPrice)}
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                className="btn-right"
                onClick={handelNextCheckOut}
                title="Next"
              >
                Next
              </button>
              <div className="format-bg-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowSeatScreen;
