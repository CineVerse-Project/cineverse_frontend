import React, { useState, useEffect } from "react";
import RevenueChart from "./RevenueChart";
import adminService from "../../../../services/AdminServices";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

const reportSchema = Yup.object().shape({
    reportType: Yup.string().required("Loại báo cáo phải được nhập"),
    timeType: Yup.string().required("Loại thời gian phải được nhập"),
    theater: Yup.object()
        .nullable()
        .when("reportType", {
            is: "3",
            then: Yup.object().nullable().required("Rạp chiếu phải được nhập"),
            otherwise: Yup.object().nullable(),
        }),
    movie: Yup.object()
        .nullable()
        .when("reportType", {
            is: "2",
            then: Yup.object().nullable().required("Phim phải được nhập"),
            otherwise: Yup.object().nullable(),
        }),

    province: Yup.object()
        .nullable()
        .when("reportType", {
            is: "4",
            then: Yup.object().nullable().required("Tỉnh thành phải được nhập"),
            otherwise: Yup.object().nullable(),
        }),

    startDate: Yup.string()
        .nullable()
        .when("timeType", {
            is: "1",
            then: Yup.string().required("Ngày bắt đầu phải được nhập"),
            otherwise: Yup.string(),
        }),
    endDate: Yup.string()
        .nullable()
        .when("timeType", {
            is: "1",
            then: Yup.string()
                .required("Ngày kết thúc phải được nhập")
                .test(
                    "is-greater-than-start",
                    "Ngày kết thúc phải lớn hơn ngày bắt đầu",
                    function (endDate) {
                        const startDate = this.resolve(Yup.ref("startDate"));
                        if (startDate && endDate) {
                            return new Date(endDate) > new Date(startDate);
                        }
                        return true;
                    }
                ),
            otherwise: Yup.string(),
        }),

    year: Yup.number()
        .nullable()
        .when("timeType", {
            is: "2",
            then: Yup.number().required("Năm phải được nhập"),
            otherwise: Yup.number(),
        }),
});

function RevenueReport() {
    const [reportType, setReportType] = useState();
    const [timeType, setTimeType] = useState();
    const [movies, setMovies] = useState();
    const [theaters, setTheaters] = useState();
    const [provinces, setProvinces] = useState();
    const [dataSendApi, setDataSendApi] = useState();
    const [reportForm, setReportForm] = useState({
        reportType: "",
        timeType: "",
        theater: "",
        province: "",
        movie: "",
        startDate: "",
        endDate: "",
        year: "",
    });
    const [isShowReport, setIsShowReport] = useState(false);

    const handleReportTypeChange = (e, setFieldValue) => {
        const value = e.target.value;
        setReportType(value);
        setFieldValue("reportType", value);
    };

    const handleTimeTypeChange = (e, setFieldValue) => {
        const value = e.target.value;
        setTimeType(value);
        setFieldValue("timeType", value);
    };

    const handleYearChange = (e, setFieldValue) => {
        const value = e.target.value;
        setFieldValue("year", value);
    };
    useEffect(() => {
        const getAllMovieAPI = () => {
            adminService
                .getAllMovie()
                .then((data) => {
                    setMovies(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const getAllTheaterAPI = () => {
            adminService
                .getAllTheater()
                .then((data) => {
                    setTheaters(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const getAllProviceAPI = () => {
            adminService
                .getAllProvince()
                .then((data) => {
                    setProvinces(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getAllMovieAPI();
        getAllTheaterAPI();
        getAllProviceAPI();
    }, []);

    const handleTheaterChange = (event, setFieldValue) => {
        const selectedTheater = theaters.find(
            (theater) => theater.theaterName === event.target.value
        );
        setFieldValue("theater", selectedTheater || null);
        setReportForm({
            ...reportForm,
            theater: selectedTheater || undefined,
        });
    };

    const handleMovieChange = (event, setFieldValue) => {
        const selectedMovie = movies.find(
            (movie) => movie.movieName === event.target.value
        );
        setFieldValue("movie", selectedMovie || null);
        setReportForm({
            ...reportForm,
            movie: selectedMovie || undefined,
        });
    };

    const handleProvinceChange = (event, setFieldValue) => {
        const selectedProvince = provinces.find(
            (province) => province.provinceName === event.target.value
        );
        setFieldValue("province", selectedProvince || null);
        setReportForm({
            ...reportForm,
            province: selectedProvince || undefined,
        });
    };

    const handleStartDateChange = (event, setFieldValue) => {
        const value = event.target.value;
        setFieldValue("startDate", value);
    };
    console.log(timeType);
    const handleEndDateChange = (event, setFieldValue) => {
        const value = event.target.value;
        setFieldValue("endDate", value);
    };

    const handleSubmit = (values) => {
        console.log(values);
        const newObj = Object.entries(values).reduce((acc, [key, value]) => {
            if (value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {});
        setIsShowReport(true);
        setDataSendApi(newObj);
    };

    return (
        <>
            {/* <!-- Content wrapper --> */}
            <div class="content-wrapper">
                {/* <!-- Content --> */}
                <div class="container-xxl flex-grow-1 container-p-y">
                    <h4 class="fw-bold py-3 mb-4">
                        <span class="text-muted fw-light">Thống kê /</span>
                        Doanh thu
                    </h4>
                    <div class="row">
                        <div class="col-lg-12 mb-4 order-0">
                            <ul class="nav nav-pills flex-column flex-md-row mb-3">
                                <li class="nav-item">
                                    <Link
                                        to="/revenue-report"
                                        class="nav-link active"
                                    >
                                        <i class="bx bxs-bar-chart-square me-1"></i>
                                        Doanh thu
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/ticket-report" class="nav-link">
                                        <i class="bx bx-credit-card-front me-1"></i>
                                        Vé Đã Bán
                                    </Link>
                                </li>
                            </ul>
                            <Formik
                                initialValues={reportForm}
                                validationSchema={reportSchema}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                {({ errors, touched, setFieldValue }) => (
                                    <Form>
                                        <div class="card mb-3">
                                            <div class="row p-3">
                                                <div class="col-sm-3 mb-3">
                                                    <label
                                                        for="reportType"
                                                        class="form-label"
                                                    >
                                                        Loại báo cáo
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="reportType"
                                                        class="form-select"
                                                        id="reportType"
                                                        onChange={(event) =>
                                                            handleReportTypeChange(
                                                                event,
                                                                setFieldValue
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Chọn loại báo cáo
                                                        </option>
                                                        <option value={1}>
                                                            Tổng doanh thu
                                                        </option>
                                                        <option value={2}>
                                                            Doanh thu theo phim
                                                        </option>
                                                        <option value={3}>
                                                            Doanh thu theo rạp
                                                        </option>
                                                        <option value={4}>
                                                            Doanh thu theo tỉnh
                                                            thành
                                                        </option>
                                                    </Field>
                                                    <div className="error ms-3">
                                                        {errors.reportType &&
                                                        touched.reportType ? (
                                                            <div>
                                                                {
                                                                    errors.reportType
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                {reportType === "4" && (
                                                    <div class="col-sm-3 mb-3">
                                                        <label
                                                            for="province"
                                                            class="form-label"
                                                        >
                                                            Tỉnh thành:
                                                        </label>

                                                        <Field
                                                            className="form-control"
                                                            list="provinceList"
                                                            id="province"
                                                            name="province.provinceName"
                                                            placeholder="Nhập để tìm kiếm tỉnh thành ..."
                                                            as="input"
                                                            onChange={(event) =>
                                                                handleProvinceChange(
                                                                    event,
                                                                    setFieldValue
                                                                )
                                                            }
                                                        />
                                                        <div className="error ms-3">
                                                            {errors.province &&
                                                            touched.province ? (
                                                                <div>
                                                                    {
                                                                        errors.province
                                                                    }
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <datalist id="provinceList">
                                                            {provinces &&
                                                                provinces.map(
                                                                    (
                                                                        province
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                key={
                                                                                    province.provinceId
                                                                                }
                                                                                value={
                                                                                    province.provinceName
                                                                                }
                                                                            >
                                                                                {
                                                                                    province.provinceName
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </datalist>
                                                    </div>
                                                )}
                                                {reportType === "3" && (
                                                    <div class="col-sm-3 mb-3">
                                                        <label
                                                            for="theater"
                                                            class="form-label"
                                                        >
                                                            Tên rạp:
                                                        </label>

                                                        <Field
                                                            className="form-control"
                                                            list="theaterList"
                                                            id="theater"
                                                            name="theater.theaterName"
                                                            placeholder="Nhập để tìm kiếm rạp ..."
                                                            as="input"
                                                            onChange={(event) =>
                                                                handleTheaterChange(
                                                                    event,
                                                                    setFieldValue
                                                                )
                                                            }
                                                        />
                                                        <div className="error ms-3">
                                                            {errors.theater &&
                                                            touched.theater ? (
                                                                <div>
                                                                    {
                                                                        errors.theater
                                                                    }
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <datalist id="theaterList">
                                                            {theaters &&
                                                                theaters.map(
                                                                    (
                                                                        theater
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                key={
                                                                                    theater.theaterId
                                                                                }
                                                                                value={
                                                                                    theater.theaterName
                                                                                }
                                                                            >
                                                                                {
                                                                                    theater.theaterName
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </datalist>
                                                    </div>
                                                )}

                                                {reportType === "2" && (
                                                    <div class="col-sm-3 mb-3">
                                                        <label
                                                            for="movie"
                                                            class="form-label"
                                                        >
                                                            Phim
                                                        </label>
                                                        <Field
                                                            as="input"
                                                            className="form-control"
                                                            name="movie.movieName"
                                                            list="movieList"
                                                            id="movie"
                                                            placeholder="Nhập để tìm kiếm phim ..."
                                                            onChange={(event) =>
                                                                handleMovieChange(
                                                                    event,
                                                                    setFieldValue
                                                                )
                                                            }
                                                        />
                                                        <div className="error ms-3">
                                                            {" "}
                                                            {errors.movie &&
                                                            touched.movie ? (
                                                                <div>
                                                                    {
                                                                        errors.movie
                                                                    }
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <datalist id="movieList">
                                                            {movies &&
                                                                movies.map(
                                                                    (movie) => {
                                                                        return (
                                                                            <option
                                                                                key={
                                                                                    movie.movieId
                                                                                }
                                                                                value={
                                                                                    movie.movieName
                                                                                }
                                                                            >
                                                                                {
                                                                                    movie.movieName
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </datalist>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="row p-3">
                                                <div class="col-sm-3 mb-3">
                                                    <label
                                                        for="timeType"
                                                        class="form-label"
                                                    >
                                                        Loại thời gian
                                                    </label>

                                                    <Field
                                                        as="select"
                                                        name="timeType"
                                                        class="form-select"
                                                        id="timeType"
                                                        onChange={(event) =>
                                                            handleTimeTypeChange(
                                                                event,
                                                                setFieldValue
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Chọn loại thời gian
                                                        </option>
                                                        <option value={1}>
                                                            Theo khoảng thời
                                                            gian
                                                        </option>
                                                        <option value={2}>
                                                            Theo tháng
                                                        </option>
                                                    </Field>
                                                    <div className="error ms-3">
                                                        {errors.timeType &&
                                                        touched.timeType ? (
                                                            <div>
                                                                {
                                                                    errors.timeType
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                {timeType === "1" && (
                                                    <>
                                                        <div class="col-sm-3 mb-3">
                                                            <label
                                                                for="startDate"
                                                                class="form-label"
                                                            >
                                                                Từ ngày:
                                                            </label>

                                                            <Field
                                                                className="form-control"
                                                                id="startDate"
                                                                name="startDate"
                                                                as="input"
                                                                type="date"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleStartDateChange(
                                                                        event,
                                                                        setFieldValue
                                                                    )
                                                                }
                                                            />
                                                            <div className="error ms-3">
                                                                {errors.startDate &&
                                                                touched.startDate ? (
                                                                    <div>
                                                                        {
                                                                            errors.startDate
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3 mb-3">
                                                            <label
                                                                for="endDate"
                                                                class="form-label"
                                                            >
                                                                Đến ngày:
                                                            </label>

                                                            <Field
                                                                className="form-control"
                                                                id="endDate"
                                                                name="endDate"
                                                                as="input"
                                                                type="date"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleEndDateChange(
                                                                        event,
                                                                        setFieldValue
                                                                    )
                                                                }
                                                            />
                                                            <div className="error ms-3">
                                                                {errors.endDate &&
                                                                touched.endDate ? (
                                                                    <div>
                                                                        {
                                                                            errors.endDate
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                {timeType === "2" && (
                                                    <>
                                                        <div class="col-sm-3 mb-3">
                                                            <label
                                                                for="year"
                                                                class="form-label"
                                                            >
                                                                Năm:
                                                            </label>

                                                            <Field
                                                                className="form-control"
                                                                id="year"
                                                                name="year"
                                                                as="input"
                                                                type="number"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleYearChange(
                                                                        event,
                                                                        setFieldValue
                                                                    )
                                                                }
                                                            />
                                                            <div className="error ms-3">
                                                                {errors.year &&
                                                                touched.year ? (
                                                                    <div>
                                                                        {
                                                                            errors.year
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <div class="col-sm-3 mb-3">
                                                    <label
                                                        for="startYear"
                                                        class="form-label"
                                                    >
                                                        {`${"\u00A0"}`}
                                                    </label>
                                                    <button
                                                        type="submit"
                                                        class="btn btn btn-info form-control"
                                                    >
                                                        Xem thống kê
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        {/* <!-- Total Revenue --> */}
                        {isShowReport && (
                            <RevenueChart dataApi={dataSendApi}></RevenueChart>
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

export default RevenueReport;
