import React, { useEffect, useState } from "react";
import { CategoryScale } from "chart.js";

import Chart from "chart.js/auto";

import {
    getCurrentDate,
    getFirstAndLastDayOfMonth,
} from "../../../utils/dateUtils";
import RevenueChart from "./report/RevenueChart";
import Top3Movie from "./report/Top3Movie";
import TicketChart from "./report/TicketChart";
import Top5Theater from "./report/Top5Theater";
import { Link } from "react-router-dom";

Chart.register(CategoryScale);

function Dashboard() {
    const [dataRevenueSendApi, setDataRevenueSendApi] = useState();
    useEffect(() => {
        const { firstDay } = getFirstAndLastDayOfMonth();
        const currentDay = getCurrentDate();
        setDataRevenueSendApi({
            reportType: "1",
            timeType: "1",
            startDate: firstDay,
            endDate: currentDay,
        });
    }, []);

    return (
        <>
            {/* <!-- Content wrapper --> */}
            <div class="content-wrapper">
                {/* <!-- Content --> */}
                <div class="container-xxl flex-grow-1 container-p-y">
                    <div>
                        <div class="col-lg-12 mb-4 order-0">
                            <div class="card">
                                <div class="d-flex align-items-end row">
                                    <div class="col-sm-7">
                                        <div class="card-body">
                                            <h5 class="card-title text-primary">
                                                Xin chào,
                                                <span class="fw-bold">
                                                    Phan An!
                                                </span>
                                                🎉
                                            </h5>

                                            <p class="mb-3">
                                                Để xem đầy đủ thống kê vui lòng
                                                chọn
                                                <span class="fw-bold">
                                                    {" "}
                                                    Xem thống kê chi tiết
                                                </span>
                                            </p>

                                            <Link
                                                to="revenue-report"
                                                class="btn btn btn-primary"
                                            >
                                                Xem thống kê chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                    <div class="col-sm-5 text-center text-sm-left">
                                        <div class="card-body pb-0 px-0 px-md-4">
                                            <img
                                                src="../static/assets/img/illustrations/man-with-laptop-light.png"
                                                height="140"
                                                alt="View Badge User"
                                                data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                                data-app-light-img="illustrations/man-with-laptop-light.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {dataRevenueSendApi && (
                            <RevenueChart
                                dataApi={dataRevenueSendApi}
                            ></RevenueChart>
                        )}

                        <div className="row">
                            <Top3Movie></Top3Movie>
                            <Top5Theater></Top5Theater>
                        </div>
                        {dataRevenueSendApi && (
                            <TicketChart
                                dataApi={dataRevenueSendApi}
                            ></TicketChart>
                        )}
                    </div>
                </div>
                {/* <!-- / Content --> */}

                <div class="content-backdrop fade"></div>
            </div>
            {/* <!-- Content wrapper --> */}
        </>
    );
}

export default Dashboard;
