import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ticketService from "../../../../../services/TicketService";
import { format } from "date-fns";
import VND from "./FormatMoney";

function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const selectedSeats = location.state && location.state.selectedSeats;
  const [totalPrice, setTotalPrice] = useState(0);
  const showTimeValue = selectedSeats[0]?.schedule?.scheduleId;
  const dateTime = new Date(showTimeValue?.sheduleDateTime);

  useEffect(() => {
    setTotalPrice(
      selectedSeats?.reduce((total, item) => total + Number(item.price), 0)
    );
  }, [selectedSeats]);

  useEffect(() => {
    const fetchGetAllProvinceApi = async () => {
      ticketService
        .findCustomerByUser()
        .then((data) => {
          setCustomer(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchGetAllProvinceApi();
  }, []);

  
  const handleGoBack = () => {
    navigate(
      "/seat?sheduleDateTime=" +
        format(dateTime, "yyyy-MM-dd'T'HH:mm") +
        "&roomId=" +
        showTimeValue.roomId,
      { state: { selectedSeats: selectedSeats } }
    );
  };

  const handlePayment = () => {
    let checkTicketExist = false;
    const fetchCreateBookingApi = async () => {
      const promises = selectedSeats?.map((seat) =>
        ticketService.findTicketByTicketId(seat.ticketId)
      );

      try {
        const responses = await Promise.all(promises);
        const tickets = responses.map((response) => response);

        let ticketValue = [];

        tickets.forEach((ticket, index) => {
          console.log(ticket);
          if (ticket?.booked) {
            checkTicketExist = true;
          }
          ticketValue.push({ ticketId: selectedSeats[index].ticketId });
        });

        if (checkTicketExist) {
          alert("Ghế của bạn đã được đặt trước. Vui lòng chọn lại ghế khác!!!");
        } else {
          Cookies.set("ticketItem", JSON.stringify(ticketValue), {
            expires: 15 / (24 * 60),
          });
          const responeBooking = await ticketService.booking();
          ticketService
            .payment(responeBooking.bookingId, totalPrice)
            .then((data) => {
              window.location.href = data.data;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCreateBookingApi();
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption === "vnpay") {
      handlePayment();
    } else {
      alert("Phải chọn hình thức thanh toán trước khi thanh toán!!!");
    }
  };

  return (
    <div className="ms-5">
      <main role="main">
        <div className="container mt-4">
          <div>
            <div className="py-5 text-center">
              <i className="fa fa-credit-card fa-4x" aria-hidden="true" />
              <h2>Thanh toán</h2>
              <p className="lead">
                Vui lòng kiểm tra thông tin Khách hàng, thông tin vé trước khi
                đặt.
              </p>
            </div>
            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="">Thông tin vé</span>
                </h4>
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0 mb-2">Phim</h6>
                      <h6 className="text-muted">
                        {selectedSeats[0]?.schedule?.movie?.movieName}
                      </h6>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0 mb-2">Thời gian</h6>
                      <h6 className="text-muted">
                        {format(dateTime, "dd/MM/yyyy, HH:mm")}
                      </h6>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0 mb-2">Ghế</h6>
                      <div className="d-flex">
                        {selectedSeats?.map((seat, index) => {
                          return (
                            <h6 key={index} className="text-muted">
                              {seat.seat.seatName}
                              {index !== selectedSeats.length - 1 && ", "}
                            </h6>
                          );
                        })}
                      </div>
                    </div>
                    <h6>{selectedSeats[0]?.seat?.room?.roomName}</h6>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <h6>Tổng thành tiền</h6>
                    <h5>{VND.format(totalPrice)}</h5>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Thông tin khách hàng</h4>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label className="form-label" htmlFor="fullName">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      id="fullName"
                      defaultValue={customer?.fullName}
                      readOnly
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="form-label" htmlFor="gender">
                      Giới tính
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="gender"
                      id="gender"
                      defaultValue={customer?.gender ? "Nam" : "Nữ"}
                      readOnly
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="form-label" htmlFor="address">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="address"
                      defaultValue={customer?.address}
                      readOnly
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="form-label" htmlFor="phoneNumber">
                      Điện thoại
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      id="phoneNumber"
                      defaultValue={customer?.phoneNumber}
                      readOnly
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      defaultValue={customer?.email}
                      readOnly
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="form-label" htmlFor="birthDay">
                      Ngày sinh
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="birthDay"
                      id="birthDay"
                      defaultValue={customer?.birthday}
                      readOnly
                    />
                  </div>
                  <h6 className="text-danger">
                    Nếu thông tin cá nhân không đúng, vui lòng đến trang cá nhân
                    để thay đổi!!
                  </h6>
                </div>

                <hr className="mb-4" />
              </div>
            </div>
          </div>
              {/* <div>
                <input
                  type="radio"
                  id="option2"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="option2">Option 2</label>
              </div> */}
          <div className="ms-3">
            <h4 className="mb-3">Hình thức thanh toán</h4>
            <div className="ms-3 mb-4">
              <input
                type="radio"
                id="vnpay"
                value="vnpay"
                checked={selectedOption === "vnpay"}
                onChange={handleOptionChange}
              />
              <label htmlFor="vnpay" className="ms-2">
                VNPay
              </label>
            </div>
            <hr className="mb-4" />
            <div className="d-flex justify-content-between mb-3">
              <button
                className="btn btn-outline-dark btn-lg btn-block"
                type="button"
                onClick={handleGoBack}
              >
                Trang trước
              </button>
              <button
                className="btn btn-outline-dark btn-lg btn-block"
                type="submit"
                onClick={handleSubmit}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckOut;
