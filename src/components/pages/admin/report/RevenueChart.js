import React, { useEffect, useState } from "react";
import { CategoryScale } from "chart.js";

import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import adminService from "../../../../services/AdminServices";

Chart.register(CategoryScale);

function RevenueChart(props) {
    const [maxRevenue, setMaxRevenue] = useState(0);
    const [minRevenue, setMinRevenue] = useState(0);
    const [averageRevenue, setAverageRevenue] = useState(0);
    const [maxRevenueLastMonth, setMaxRevenueLastMonth] = useState(0);
    const [minRevenueLastMonth, setMinRevenueLastMonth] = useState(0);
    const [averageRevenueLastMonth, setAverageRevenueLastMonth] = useState(0);
    const [increaseMinPercent, setIncreaseMinPercent] = useState(0);
    const [increaseMaxPercent, setIncreaseMaxPercent] = useState(0);
    const [increaseAvgPercent, setIncreaseAvgPercent] = useState(0);
    const [revenueList, setRevenueList] = useState();
    const [revenueLastMonthList, setRevenueLastMonthList] = useState();
    const [labels, setLabels] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    const dataSendAPI = props.dataApi;
    console.log(dataSendAPI);

    useEffect(() => {
        if (dataSendAPI.reportType === "1") {
            if (dataSendAPI.timeType === "1") {
                const getRevenueByPeriodApi = () => {
                    adminService
                        .getRevenueByPeriodTime(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                getRevenueByPeriodApi();
            }
            if (dataSendAPI.timeType === "2") {
                const getRevenueByMonthInYearApi = () => {
                    adminService
                        .getRevenueMonthInYear(dataSendAPI.year)
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                getRevenueByMonthInYearApi();
            }
        }
        if (dataSendAPI.reportType === "2") {
            if (dataSendAPI.timeType === "1") {
                const getRevenueByPeriodTimeAndMovie = () => {
                    adminService
                        .getRevenueByPeriodTimeAndMovie(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate,
                            dataSendAPI.movie.movieId
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getRevenueByPeriodTimeAndMovie();
            }
            if (dataSendAPI.timeType === "2") {
                const getRevenueMonthInYearAndMovie = () => {
                    adminService
                        .getRevenueMonthInYearAndMovie(
                            dataSendAPI.year,
                            dataSendAPI.movie.movieId
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getRevenueMonthInYearAndMovie();
            }
        }
        if (dataSendAPI.reportType === "3") {
            if (dataSendAPI.timeType === "1") {
                const getRevenueByPeriodTimeAndTheater = () => {
                    adminService
                        .getRevenueByPeriodTimeAndTheater(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate,
                            dataSendAPI.theater.theaterId
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getRevenueByPeriodTimeAndTheater();
            }
            if (dataSendAPI.timeType === "2") {
                const getRevenueMonthInYearAndTheater = () => {
                    adminService
                        .getRevenueMonthInYearAndTheater(
                            dataSendAPI.year,
                            dataSendAPI.theater.theaterId
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getRevenueMonthInYearAndTheater();
            }
        }
        if (dataSendAPI.reportType === "4") {
            if (dataSendAPI.timeType === "1") {
                const getRevenueByPeriodTimeAndProvince = () => {
                    adminService
                        .getRevenueByPeriodTimeAndProvince(
                            dataSendAPI.startDate,
                            dataSendAPI.endDate,
                            dataSendAPI.province.provinceId
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getRevenueByPeriodTimeAndProvince();
            }
            if (dataSendAPI.timeType === "2") {
                const getRevenueMonthInYearAndProvince = () => {
                    adminService
                        .getRevenueMonthInYearAndProvince(
                            dataSendAPI.year,
                            dataSendAPI.province.provinceId
                        )
                        .then((data) => {
                            setRevenueList(data.currentPeriod);
                            setRevenueLastMonthList(data.previousPeriod);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                getRevenueMonthInYearAndProvince();
            }
        }
    }, [dataSendAPI]);

    useEffect(() => {
        if (revenueList?.length > 0) {
            // const filteredData = revenueList.filter(
            //     (item) => item.revenue !== 0
            // );
            // if (filteredData.length > 0) {
            const maxRevenue = Math.max(
                ...revenueList.map((item) => item.revenue)
            );
            const minRevenue = Math.min(
                ...revenueList.map((item) => item.revenue)
            );
            const totalRevenue = revenueList.reduce(
                (sum, item) => sum + item.revenue,
                0
            );
            const averageRevenue = totalRevenue / revenueList.length;

            setMaxRevenue(maxRevenue);
            setMinRevenue(minRevenue);
            setAverageRevenue(averageRevenue);
            let timeLabel = [];
            let dataRevenue = [];
            revenueList?.forEach((revenue) => {
                timeLabel = [...timeLabel, revenue.time];
                dataRevenue = [...dataRevenue, revenue.revenue];
            });
            setLabels([...timeLabel]);
            setDataChart([...dataRevenue]);
            // }
        }
        if (revenueLastMonthList?.length > 0) {
            // const filteredData = revenueLastMonthList.filter(
            //     (item) => item.revenue !== 0
            // );
            // if (filteredData.length > 0) {
            const maxRevenue = Math.max(
                ...revenueLastMonthList.map((item) => item.revenue)
            );
            const minRevenue = Math.min(
                ...revenueLastMonthList.map((item) => item.revenue)
            );
            const totalRevenue = revenueLastMonthList.reduce(
                (sum, item) => sum + item.revenue,
                0
            );
            const averageRevenue = totalRevenue / revenueLastMonthList.length;

            setMaxRevenueLastMonth(maxRevenue);
            setMinRevenueLastMonth(minRevenue);
            setAverageRevenueLastMonth(averageRevenue);
            // }
        }
    }, [revenueLastMonthList, revenueList]);

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
        const maxIncreasePercent =
            (maxRevenue / maxRevenueLastMonth) * 100 - 100;
        const minIncreasePercent =
            (minRevenue / minRevenueLastMonth) * 100 - 100;
        const avgIncreasePercent =
            (averageRevenue / averageRevenueLastMonth) * 100 - 100;
        setIncreaseMaxPercent(maxIncreasePercent);
        setIncreaseMinPercent(minIncreasePercent);
        setIncreaseAvgPercent(avgIncreasePercent);
    }, [
        averageRevenue,
        averageRevenueLastMonth,
        maxRevenue,
        maxRevenueLastMonth,
        minRevenue,
        minRevenueLastMonth,
    ]);
    return (
        <div class="row">
            {/* <!-- Total Revenue --> */}
            <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                <div class="card">
                    <div class="row row-bordered g-0">
                        <div class="col-md-12">
                            <h5 class="card-header m-0 me-2 pb-3">
                                {dataSendAPI.reportType === "1" ? (
                                    <div>Tổng doanh thu</div>
                                ) : dataSendAPI.reportType === "2" ? (
                                    <div>Doanh thu theo phim</div>
                                ) : dataSendAPI.reportType === "3" ? (
                                    <div>Doanh thu theo rạp</div>
                                ) : (
                                    <div>Doanh thu theo tỉnh thành</div>
                                )}
                            </h5>
                            <div id="" class="px-2">
                                {revenueList &&
                                    dataSendAPI.timeType === "1" && (
                                        <Line
                                            data={data}
                                            options={{
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "Doanh thu",
                                                    },
                                                    legend: {
                                                        display: false,
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                {revenueList &&
                                    dataSendAPI.timeType === "2" && (
                                        <Bar
                                            data={data}
                                            options={{
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "Doanh thu",
                                                    },
                                                    legend: {
                                                        display: false,
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--/ Total Revenue --> */}
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
                                    Doanh thu cao nhất
                                </span>
                                <h4 class="card-title text-nowrap mb-2">
                                    {maxRevenue > 0 ? (
                                        <div>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(maxRevenue)}
                                        </div>
                                    ) : (
                                        <div>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(0)}
                                        </div>
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
                                    Doanh thu thấp nhất
                                </span>
                                <h4 class="card-title mb-2">
                                    {minRevenue !== 0 ? (
                                        <div>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(minRevenue)}
                                            đ
                                        </div>
                                    ) : (
                                        <div>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(0)}
                                        </div>
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
                                                Doanh thu trung bình
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
                                                {averageRevenue !== 0 ? (
                                                    <div>
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(
                                                            averageRevenue
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>0đ</div>
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

export default RevenueChart;
