import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./css/showTimeScreen.css";
import ScheduleServices from "../../../../../services/ScheduleServices";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ShowTimeScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const movieId = queryParam.get("movieId");
  console.log(movieId);
  const currentDate = new Date();
  const [schedules, setSchedules] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [showDayValue, setshowDayValue] = useState(
    format(currentDate, "yyyy-MM-dd'T'00:00")
  );
  const [provinceValue, setProvinceValue] = useState("PV-0001");
  const [showTimeValue, setShowTimeValue] = useState({
    scheduleDateTime: "",
    roomId: "",
  });
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    // Ngày hiện tại
    const numDays = 14; // Số ngày cần lấy

    const renderDateList = () => {
      const tempList = [];
      for (let i = 0; i < numDays; i++) {
        const currentDateCopy = new Date(currentDate); // Tạo một bản sao của ngày hiện tại
        currentDateCopy.setDate(currentDate.getDate() + i);
        const formattedDate = format(currentDateCopy, "yyyy-MM-dd'T'00:00");
        tempList.push({
          date: formattedDate,
          day: currentDateCopy.toLocaleString("en-US", { day: "2-digit" }),
          month: currentDateCopy.toLocaleString("en-US", { month: "2-digit" }),
          year: currentDateCopy.getFullYear(),
          dayOfWeek: currentDateCopy.toLocaleString("en-US", {
            weekday: "short",
          }),
        });
      }
      return tempList;
    };

    setDateList(renderDateList());
  }, []);
  useEffect(() => {
    const fetchGetAllProvinceApi = async () => {
      ScheduleServices.getAllProvince()
        .then((data) => {
          setProvinces(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchGetAllProvinceApi();
    const fetchGetScheduleByMovieApi = async () => {
      ScheduleServices.getAllScheduleByMovie(
        movieId,
        showDayValue,
        provinceValue
      )
        .then((data) => {
          if (data) {
            const groupedObjects = {};

            data?.forEach((object) => {
              const theaterName = object.room.theater.theaterName;
              if (theaterName) {
                if (!groupedObjects[theaterName]) {
                  groupedObjects[theaterName] = [];
                }
                groupedObjects[theaterName].push(object);
              }
            });
            setSchedules(Object.values(groupedObjects));
          } else {
            setSchedules([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchGetScheduleByMovieApi();
  }, [showDayValue, provinceValue]);

  const handleFilterShowday = (e) => {
    const currentShowdayValue = e.target.value;
    setshowDayValue(currentShowdayValue);
  };

  const handleProvinceValue = (e) => {
    const currentProvinceValue = e.target.value;
    setProvinceValue(currentProvinceValue);
  };
  const handleShowTimeValue = (scheduleId) => {
    console.log(scheduleId);
    setShowTimeValue({ ...scheduleId });
  };

  const dateTime = new Date(showTimeValue.sheduleDateTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showTimeValue.scheduleDateTime !== "") {
      navigate(
        "/seat?sheduleDateTime=" +
          format(dateTime, "yyyy-MM-dd'T'HH:mm") +
          "&roomId=" +
          showTimeValue.roomId
      );
    } else {
      toast.warn("Vui lòng chọn giờ chiếu");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center">Chọn lịch chiếu</h1>
        <div className="line__big">
          <ul className="none__list d-flex view__date">
            {dateList.map((date, index) => {
              return (
                <div
                  className="row-md-2"
                  onClick={handleFilterShowday}
                  key={index}
                >
                  <li className="me-3">
                    <button
                      className={
                        showDayValue === date.date
                          ? "btn btn-dark day "
                          : "btn btn-outline-dark day"
                      }
                      value={date.date}
                    >
                      <span>{date.month}</span>
                      <em>{date.dayOfWeek}</em>
                      <strong>{date.day}</strong>
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="line__big">
          <ul className="none__list d-flex">
            {provinces?.map((item) => {
              return (
                <div onClick={handleProvinceValue} key={item.provinceId}>
                  <li className="me-3 d-flex">
                    <button
                      className={
                        provinceValue === item.provinceId
                          ? "btn btn-dark"
                          : "btn btn-outline-dark"
                      }
                      value={item.provinceId}
                    >
                      {item.provinceName}
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="line__big">
          {schedules &&
            schedules?.map((item, index) => {
              return (
                <div key={index} className="line__mini">
                  <h4>{item[0].room.theater.theaterName}</h4>
                  <ul className="none__list d-flex">
                    {item.map((time, index) => {
                      console.log(time.scheduleId.sheduleDateTime);
                      const dateTime = new Date(
                        time.scheduleId.sheduleDateTime
                      );
                      const hour = dateTime.getHours();
                      const minute = dateTime.getMinutes();
                      return (
                        <li
                          key={index}
                          className="me-3"
                          onClick={() => handleShowTimeValue(time.scheduleId)}
                        >
                          <button
                            className={
                              showTimeValue?.sheduleDateTime ===
                                time.scheduleId.sheduleDateTime &&
                              showTimeValue?.roomId === time.scheduleId.roomId
                                ? "btn btn-dark"
                                : "btn btn-outline-dark"
                            }
                            value={time.scheduleId}
                          >
                            {minute === 0 && (
                              <span>
                                {hour}:{minute}0
                              </span>
                            )}
                            {minute !== 0 && (
                              <span>
                                {hour}:{minute}
                              </span>
                            )}
                            <br></br>
                            <span>{time.room.roomName}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          {schedules.length === 0 && (
            <h5 className="text-center">
              Xin lỗi, vì không có suất chiếu vào ngày này, hãy chọn một ngày
              khác
            </h5>
          )}
        </div>
        {schedules && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-dark" onClick={handleSubmit}>
              Chọn ghế
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowTimeScreen;
