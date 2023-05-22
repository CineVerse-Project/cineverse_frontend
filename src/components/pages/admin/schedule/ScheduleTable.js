import React from "react";

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
                <i className="fab fa-angular fa-lg text-danger me-3"></i>
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
            <td>{schedule.scheduleId.sheduleDateTime}</td>
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
                        <a className="dropdown-item" href="edit-schedule.html">
                            <i className="bx bx-edit-alt me-1"></i>
                            Edit
                        </a>
                        <button
                            className="dropdown-item"
                            onClick={handleDeleteSchedule}
                        >
                            <i className="bx bx-trash me-1"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default ScheduleTable;
