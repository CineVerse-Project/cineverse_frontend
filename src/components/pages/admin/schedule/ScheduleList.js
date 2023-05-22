import React, { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Button, Modal } from "react-bootstrap";

import adminService from "../../../../services/AdminServices";
import ScheduleTable from "./ScheduleTable";

function ScheduleList() {
    const [schedules, setSchedules] = useState();
    const [pageable, setPageable] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [deletedScheduleId, setDeletedScheduleId] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const getAllScheduleAPI = () => {
            adminService
                .getAllSchedule(currentPage - 1)
                .then((data) => {
                    setSchedules(data.content);
                    let { content, ...pagination } = data;
                    setPageable({ ...pagination });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getAllScheduleAPI();
    }, [currentPage, deletedScheduleId]);

    const handleDeleteSchedule = (scheduleId) => {
        setDeletedScheduleId(scheduleId);
        setModalOpen(true);
    };

    const handleRemove = (scheduleId) => {
        adminService
            .deleteScheduleById(scheduleId)
            .then((data) => {
                setModalOpen(false);
                setDeletedScheduleId(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <h4 className="fw-bold py-3 mb-4">
                        <span className="text-muted fw-light">
                            Lịch chiếu /
                        </span>
                        Danh sách
                    </h4>
                    <a
                        href="create-schedule.html"
                        className="btn btn btn-primary mb-3"
                    >
                        Thêm lịch chiếu
                    </a>

                    <div className="card">
                        <h5 className="card-header">
                            Lịch chiếu
                            <div style={{ float: "right", width: "50%" }}>
                                <div>
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Tìm kiếm ..."
                                        id="html5-search-input"
                                    />
                                </div>
                            </div>
                        </h5>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-center col-1">
                                            #id
                                        </th>
                                        <th className="text-center col-2">
                                            Ảnh
                                        </th>
                                        <th className="text-center col-3">
                                            Tên phim
                                        </th>
                                        <th className="text-center col-2">
                                            Thời gian bắt đầu
                                        </th>
                                        <th className="text-center col-1">
                                            Phòng
                                        </th>
                                        <th className="text-center col-2">
                                            Rạp
                                        </th>
                                        <th className="text-center col-1">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {!schedules && (
                                        <tr className="text-center">
                                            <td colSpan={7}>
                                                <h4 className="mt-3">
                                                    Không có dữ liệu phù hợp
                                                </h4>
                                            </td>
                                        </tr>
                                    )}
                                    {schedules?.length > 0 &&
                                        schedules?.map((schedule, index) => {
                                            return (
                                                <ScheduleTable
                                                    schedule={schedule}
                                                    index={index}
                                                    currentPage={currentPage}
                                                    pageable={pageable}
                                                    key={index}
                                                    handleDeleteSchedule={() =>
                                                        handleDeleteSchedule(
                                                            schedule.scheduleId
                                                        )
                                                    }
                                                />
                                            );
                                        })}
                                </tbody>
                            </table>

                            {pageable && (
                                <div className="m-3 d-flex justify-content-center">
                                    <PaginationControl
                                        page={currentPage}
                                        between={3}
                                        total={pageable.totalElements}
                                        limit={pageable.size}
                                        changePage={(page) => {
                                            setCurrentPage(page);
                                        }}
                                        ellipsis={1}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Modal
                    show={isModalOpen}
                    onHide={() => setModalOpen(false)}
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có chắc muốn xóa lịch chiếu lúc{" "}
                        {deletedScheduleId?.sheduleDateTime} tại{" "}
                        {deletedScheduleId?.roomId}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setModalOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleRemove(deletedScheduleId)}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="content-backdrop fade"></div>
            </div>
        </>
    );
}

export default ScheduleList;
