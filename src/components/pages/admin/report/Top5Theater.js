import React, { useState } from "react";
import adminService from "../../../../services/AdminServices";
import { getCurrentDate } from "../../../../utils/dateUtils";

function Top5Theater() {
    const [theaters, setTheaters] = useState();
    useState(() => {
        const currentDate = getCurrentDate();
        const getTop5TheaterInMonth = () => {
            adminService
                .getTop5TheaterInMonth(currentDate)
                .then((data) => {
                    setTheaters(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getTop5TheaterInMonth();
    }, []);
    return (
        <>
            {/* <!-- Transactions --> */}
            <div class="col-md-6 col-lg-6 order-2 mb-4">
                <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <h5 class="card-title m-0 me-2">
                            Top 5 rạp có doanh thu cao nhất
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="p-0 m-0">
                            {theaters &&
                                theaters.map((theaters) => {
                                    return (
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                <div class="me-2">
                                                    <h6 class="mb-0">
                                                        {theaters.theaterName}
                                                    </h6>
                                                    <small class="text-muted d-block mb-1">
                                                        {theaters.province}
                                                    </small>
                                                </div>
                                                <div class="user-progress d-flex align-items-center gap-1">
                                                    <h6 class="mb-0">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(
                                                            theaters.revenue
                                                        )}
                                                    </h6>
                                                    <span class="text-muted"></span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!--/ Transactions --> */}
        </>
    );
}

export default Top5Theater;
