import React, { useEffect, useState } from "react";
import { CategoryScale } from "chart.js";

import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import adminService from "../../../../services/AdminServices";

Chart.register(CategoryScale);

function TicketChart(props) {
    const [maxTicket, setMaxTicket] = useState(0);
    const [minTicket, setMinTicket] = useState(0);
    const [averageTicket, setAverageTicket] = useState(0);
    const [maxTicketLastMonth, setMaxTicketLastMonth] = useState(0);
    const [minTicketLastMonth, setMinTicketLastMonth] = useState(0);
    const [averageTicketLastMonth, setAverageTicketLastMonth] = useState(0);
    const [increaseMinPercent, setIncreaseMinPercent] = useState(0);
    const [increaseMaxPercent, setIncreaseMaxPercent] = useState(0);
    const [increaseAvgPercent, setIncreaseAvgPercent] = useState(0);
    const [ticketList, setTicketList] = useState();
    const [ticketLastMonthList, setTicketLastMonthList] = useState();
    const [labels, setLabels] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    const dataSendAPI = props.dataApi;
    console.log(dataSendAPI);

    useEffect(() => {
        if (dataSendAPI.reportType === "1") {
            if (dataSendAPI.timeType === "1") {
                const getTicketByPeriodApi = () => {
                    adminService
                        .getTicketByPeriodTime(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                getTicketByPeriodApi();
            }
            if (dataSendAPI.timeType === "2") {
                const getTicketByMonthInYearApi = () => {
                    adminService
                        .getTicketMonthInYear(dataSendAPI.year)
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                getTicketByMonthInYearApi();
            }
        }
        if (dataSendAPI.reportType === "2") {
            if (dataSendAPI.timeType === "1") {
                const getTicketByPeriodTimeAndMovie = () => {
                    adminService
                        .getTicketByPeriodTimeAndMovie(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate,
                            dataSendAPI.movie.movieId
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getTicketByPeriodTimeAndMovie();
            }
            if (dataSendAPI.timeType === "2") {
                const getTicketMonthInYearAndMovie = () => {
                    adminService
                        .getTicketMonthInYearAndMovie(
                            dataSendAPI.year,
                            dataSendAPI.movie.movieId
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getTicketMonthInYearAndMovie();
            }
        }
        if (dataSendAPI.reportType === "3") {
            if (dataSendAPI.timeType === "1") {
                const getTicketByPeriodTimeAndTheater = () => {
                    adminService
                        .getTicketByPeriodTimeAndTheater(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate,
                            dataSendAPI.theater.theaterId
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getTicketByPeriodTimeAndTheater();
            }
            if (dataSendAPI.timeType === "2") {
                const getTicketMonthInYearAndTheater = () => {
                    adminService
                        .getTicketMonthInYearAndTheater(
                            dataSendAPI.year,
                            dataSendAPI.theater.theaterId
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getTicketMonthInYearAndTheater();
            }
        }
        if (dataSendAPI.reportType === "4") {
            if (dataSendAPI.timeType === "1") {
                const getTicketByPeriodTimeAndProvince = () => {
                    adminService
                        .getTicketByPeriodTimeAndProvince(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate,
                            dataSendAPI.province.provinceId
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getTicketByPeriodTimeAndProvince();
            }
            if (dataSendAPI.timeType === "2") {
                const getTicketMonthInYearAndProvince = () => {
                    adminService
                        .getTicketMonthInYearAndProvince(
                            dataSendAPI.year,
                            dataSendAPI.province.provinceId
                        )
                        .then((data) => {
                            setTicketList(data.currentPeriod);
                            setTicketLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getTicketMonthInYearAndProvince();
            }
        }
    }, [dataSendAPI]);

    useEffect(() => {
        if (ticketList?.length > 0) {
            // const filteredData = ticketList.filter(
            //     (item) => item.ticket !== 0
            // );
            // if (filteredData.length > 0) {
            const maxTicket = Math.max(
                ...ticketList.map((item) => item.ticketCount)
            );
            const minTicket = Math.min(
                ...ticketList.map((item) => item.ticketCount)
            );
            const totalTicket = ticketList.reduce(
                (sum, item) => sum + item.ticketCount,
                0
            );
            const averageTicket = totalTicket / ticketList.length;

            setMaxTicket(maxTicket);
            setMinTicket(minTicket);
            setAverageTicket(averageTicket);
            let timeLabel = [];
            let dataTicket = [];
            ticketList?.forEach((ticket) => {
                timeLabel = [...timeLabel, ticket.time];
                dataTicket = [...dataTicket, ticket.ticketCount];
            });
            setLabels([...timeLabel]);
            setDataChart([...dataTicket]);
            // }
        }
        if (ticketLastMonthList?.length > 0) {
            // const filteredData = ticketLastMonthList.filter(
            //     (item) => item.ticket !== 0
            // );
            // if (filteredData.length > 0) {
            const maxTicket = Math.max(
                ...ticketLastMonthList.map((item) => item.ticketCount)
            );
            const minTicket = Math.min(
                ...ticketLastMonthList.map((item) => item.ticketCount)
            );
            const totalTicket = ticketLastMonthList.reduce(
                (sum, item) => sum + item.ticketCount,
                0
            );
            const averageTicket = totalTicket / ticketLastMonthList.length;

            setMaxTicketLastMonth(maxTicket);
            setMinTicketLastMonth(minTicket);
            setAverageTicketLastMonth(averageTicket);
            // }
        }
    }, [ticketLastMonthList, ticketList]);

    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: "rgb(254,157,82)",
                borderColor: "rgba(255, 99, 132)",
                data: dataChart,
            },
        ],
    };

    useEffect(() => {
        const maxIncreasePercent = (maxTicket / maxTicketLastMonth) * 100 - 100;
        const minIncreasePercent = (minTicket / minTicketLastMonth) * 100 - 100;
        const avgIncreasePercent =
            (averageTicket / averageTicketLastMonth) * 100 - 100;
        setIncreaseMaxPercent(maxIncreasePercent);
        setIncreaseMinPercent(minIncreasePercent);
        setIncreaseAvgPercent(avgIncreasePercent);
    }, [
        averageTicket,
        averageTicketLastMonth,
        maxTicket,
        maxTicketLastMonth,
        minTicket,
        minTicketLastMonth,
    ]);
    return (
        <div class="row">
            {/* <!-- Total ticket --> */}
            <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                <div class="card">
                    <div class="row row-bordered g-0">
                        <div class="col-md-12">
                            <h5 class="card-header m-0 me-2 pb-3">
                                {dataSendAPI.reportType === "1" ? (
                                    <div>Tổng vé đã bán</div>
                                ) : dataSendAPI.reportType === "2" ? (
                                    <div>Vé đã bán theo phim</div>
                                ) : dataSendAPI.reportType === "3" ? (
                                    <div>Vé đã bán theo rạp</div>
                                ) : (
                                    <div>Vé đã bán theo tỉnh thành</div>
                                )}
                            </h5>
                            <div id="" class="px-2">
                                {ticketList && dataSendAPI.timeType === "1" && (
                                    <Line
                                        data={data}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: "Số vé đã bán",
                                                },
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                        }}
                                    />
                                )}
                                {ticketList && dataSendAPI.timeType === "2" && (
                                    <Bar
                                        data={data}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: "Số vé đã bán",
                                                },
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                yAxes: [
                                                    {
                                                        ticks: {
                                                            beginAtZero: true,
                                                            precision: 0,
                                                        },
                                                    },
                                                ],
                                            },
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--/ Total ticket --> */}
            <div class="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                <div class="row">
                    <div class="col-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title d-flex align-items-start justify-content-between">
                                    <div class="avatar flex-shrink-0">
                                        <i class="bx bx-bar-chart-alt icon-report text-danger"></i>
                                    </div>
                                </div>
                                <span class="fw-semibold d-block mb-1">
                                    Số vé đã bán cao nhất
                                </span>
                                <h4 class="card-title text-nowrap mb-2">
                                    {maxTicket > 0 ? (
                                        <div>
                                            {maxTicket} {" vé"}
                                        </div>
                                    ) : (
                                        <div>0</div>
                                    )}
                                </h4>

                                {increaseMaxPercent >= 0 ? (
                                    <small class="text-success fw-semibold">
                                        <i class="bx bx-up-arrow-alt"></i>
                                        <div>
                                            {parseFloat(
                                                increaseMaxPercent.toFixed(2)
                                            )}
                                            %
                                        </div>
                                    </small>
                                ) : increaseMaxPercent < 0 ? (
                                    <small class="text-danger fw-semibold">
                                        <i class="bx bx-down-arrow-alt"></i>
                                        <div>
                                            {parseFloat(
                                                increaseMaxPercent.toFixed(2)
                                            )}
                                            %
                                        </div>
                                    </small>
                                ) : (
                                    <div>N/A</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title d-flex align-items-start justify-content-between">
                                    <div class="avatar flex-shrink-0">
                                        <i class="bx bx-line-chart icon-report text-primary"></i>
                                    </div>
                                </div>
                                <span class="fw-semibold d-block mb-1">
                                    Số vé đã bán thấp nhất
                                </span>
                                <h4 class="card-title mb-2">
                                    {minTicket !== 0 ? (
                                        <div>
                                            {minTicket} {" vé"}
                                        </div>
                                    ) : (
                                        <div>0</div>
                                    )}
                                </h4>

                                {increaseMinPercent >= 0 ? (
                                    <small class="text-success fw-semibold">
                                        <i class="bx bx-up-arrow-alt"></i>
                                        <div>
                                            {parseFloat(
                                                increaseMinPercent.toFixed(2)
                                            )}
                                            %
                                        </div>
                                    </small>
                                ) : increaseMinPercent < 0 ? (
                                    <small class="text-danger fw-semibold">
                                        <i class="bx bx-down-arrow-alt"></i>
                                        <div>
                                            {parseFloat(
                                                increaseMinPercent.toFixed(2)
                                            )}
                                            %
                                        </div>
                                    </small>
                                ) : (
                                    <div>N/A</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between flex-sm-row flex-column gap-3">
                                    <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                        <div class="card-title">
                                            <h5 class="text-nowrap mb-2">
                                                Số vé đã bán trung bình
                                            </h5>
                                            <span class="badge bg-label-warning rounded-pill">
                                                Month
                                            </span>
                                        </div>
                                        <div class="mt-sm-auto">
                                            {increaseAvgPercent >= 0 ? (
                                                <small class="text-success fw-semibold">
                                                    <i class="bx bx-up-arrow-alt"></i>
                                                    <div>
                                                        {parseFloat(
                                                            increaseAvgPercent.toFixed(
                                                                2
                                                            )
                                                        )}
                                                        %
                                                    </div>
                                                </small>
                                            ) : increaseAvgPercent < 0 ? (
                                                <small class="text-danger fw-semibold">
                                                    <i class="bx bx-down-arrow-alt"></i>
                                                    <div>
                                                        {parseFloat(
                                                            increaseAvgPercent.toFixed(
                                                                2
                                                            )
                                                        )}
                                                        %
                                                    </div>
                                                </small>
                                            ) : (
                                                <div>N/A</div>
                                            )}
                                            <h4 class="mb-0">
                                                {averageTicket !== 0 ? (
                                                    <div>
                                                        {parseFloat(
                                                            averageTicket.toFixed(
                                                                0
                                                            )
                                                        )}{" "}
                                                        vé
                                                    </div>
                                                ) : (
                                                    <div>0</div>
                                                )}
                                            </h4>
                                        </div>
                                    </div>
                                    <div id="profileReportChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketChart;
