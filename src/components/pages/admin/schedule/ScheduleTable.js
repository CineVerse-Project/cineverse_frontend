import React from "react";
import { Link } from "react-router-dom";

function ScheduleTable({
    schedule,
    index,
    currentPage,
    pageable,
    handleDeleteSchedule,
}) {
    return (
        <tr>
            <td>
                <i className="fab fa-lg text-danger me-3"></i>
                <strong>{index + 1 + (currentPage - 1) * pageable.size}</strong>
            </td>
            <td>
                <img
                    style={{
                        height: "5rem",
                    }}
                    src={schedule.movie.imageUrl}
                    alt="avatar"
                />
            </td>
            <td>{schedule.movie.movieName}</td>
            <td>
                {schedule.scheduleId.sheduleDateTime.substring(0, 10)}
                {`${"\u00A0"}`}
                {schedule.scheduleId.sheduleDateTime.substring(11, 16)}
            </td>
            <td>{schedule.room.roomName}</td>
            <td>{schedule.room.theater.theaterName}</td>
            <td>
                <div className="dropdown">
                    <button
                        type="button"
                        className="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                    >
                        <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu">
                        <Link
                            to={`update/${schedule.scheduleId.sheduleDateTime}/${schedule.scheduleId.roomId}`}
                        >
                            <button className="dropdown-item">
                                <i className="bx bx-edit-alt me-1"></i>
                                Chỉnh sửa
                            </button>
                        </Link>
                        <button
                            className="dropdown-item"
                            onClick={handleDeleteSchedule}
                        >
                            <i className="bx bx-trash me-1"></i>
                            Xóa
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default ScheduleTable;
