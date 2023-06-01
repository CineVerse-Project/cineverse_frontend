import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import adminService from "../../../../services/AdminServices";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const scheduleSchema = Yup.object().shape({
    movie: Yup.object().nullable().required("Phim phải được nhập"),
});
function ScheduleFormUpdate() {
    const { scheduleId, roomId } = useParams();
    const schedule = scheduleId.substring(0, 16);
    const [movies, setMovies] = useState();
    const [theaters, setTheaters] = useState();
    const [rooms, setRooms] = useState();
    const navigate = useNavigate();

    const [scheduleForm, setSchedulleForm] = useState();

    const [errorMessages, setErrorMessages] = useState();

    useEffect(() => {
        const getScheduleById = () => {
            adminService
                .getScheduleById(schedule, roomId)
                .then((data) => {
                    console.log(data);
                    setSchedulleForm({
                        movie: data.movie,
                        theater: data.room.theater,
                        room: data.room,
                        scheduleDate: data.scheduleId.sheduleDateTime.substring(
                            0,
                            10
                        ),
                        scheduleTime: data.scheduleId.sheduleDateTime.substring(
                            11,
                            16
                        ),
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const getAllMovieAPI = () => {
            adminService
                .getAllMovie()
                .then((data) => {
                    const movieAvailable = data.filter(
                        (movie) => movie.delete === false
                    );
                    setMovies(movieAvailable);
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
        getScheduleById();
        getAllMovieAPI();
        getAllTheaterAPI();
    }, [roomId, schedule]);

    useEffect(() => {
        const getAllRoomAPI = () => {
            adminService
                .getAllRoom()
                .then((data) => {
                    const roomList = data.filter(
                        (room) =>
                            room.theater.theaterId ===
                            scheduleForm?.theater?.theaterId
                    );
                    setRooms(roomList);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getAllRoomAPI();
    }, [scheduleForm?.theater]);

    const handleTheaterChange = (event, setFieldValue) => {
        // const selectedTheater = theaters.find(
        //     (theater) => theater.theaterName === event.target.value
        // );
        // setFieldValue("theater", selectedTheater || null);
        // setSchedulleForm({
        //     ...scheduleForm,
        //     theater: selectedTheater || undefined,
        // });
    };

    const handleMovieChange = (event, setFieldValue) => {
        const selectedMovie = movies.find(
            (movie) => movie.movieName === event.target.value
        );
        setFieldValue("movie", selectedMovie || null);
        setSchedulleForm({
            ...scheduleForm,
            movie: selectedMovie || undefined,
        });
    };

    const handleRoomChange = (event, setFieldValue) => {
        const selectedRoom = rooms.find(
            (room) => room.roomId === event.target.value
        );

        setFieldValue("room", selectedRoom || null);
        setSchedulleForm({
            ...scheduleForm,
            room: selectedRoom || undefined,
        });
    };
    console.log(scheduleForm);

    const handleSubmit = (values) => {
        console.log(values);
        setErrorMessages("");
        console.log(values.scheduleDate + "T" + values.scheduleTime);
        const data = {
            scheduleId: {
                sheduleDateTime:
                    values.scheduleDate + "T" + values.scheduleTime,
                roomId: values.room.roomId,
            },
            movie: {
                movieId: values.movie.movieId,
            },
        };

        adminService
            .updateSchedule(data)
            .then((data) => {
                console.log("OK", data);
                navigate("/schedule");
            })
            .catch((error) => {
                setErrorMessages(error.response.data);
            });
    };

    return (
        <>
            <div className="content-wrapper">
                {/* <!-- Content --> */}

                <div className="container-xxl flex-grow-1 container-p-y">
                    <h4 className="fw-bold py-3 mb-4">
                        <span className="text-muted fw-light">
                            Lịch chiếu /
                        </span>
                        Chỉnh sửa lịch chiếu
                    </h4>

                    <Link to="/schedule">
                        <div className="btn btn btn-outline-primary mb-3">
                            Trở về
                        </div>
                    </Link>

                    {/* <!-- Basic Bootstrap Table --> */}
                    <div className="card mb-4">
                        <h5 className="card-header">Lịch chiếu </h5>{" "}
                        <div className="card-body">
                            {scheduleForm && (
                                <Formik
                                    initialValues={scheduleForm}
                                    validationSchema={scheduleSchema}
                                    onSubmit={(values) => handleSubmit(values)}
                                >
                                    {({ errors, touched, setFieldValue }) => (
                                        <Form>
                                            <div className="errors">
                                                {errorMessages?.scheduleId && (
                                                    <span>
                                                        {
                                                            errorMessages?.scheduleId
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="theater"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Tên rạp:
                                                </label>
                                                <div className="col-md-4">
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
                                                        disabled={true}
                                                    />
                                                    <div className="error ms-3">
                                                        {errors.theater &&
                                                        touched.theater ? (
                                                            <div>
                                                                {errors.theater}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <datalist id="theaterList">
                                                {theaters &&
                                                    theaters.map((theater) => {
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
                                                    })}
                                            </datalist>

                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="room"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Tên phòng:
                                                </label>
                                                <div className="col-md-10">
                                                    <Field
                                                        as="select"
                                                        name="room.roomId"
                                                        id="room"
                                                        className="form-control"
                                                        onChange={(event) =>
                                                            handleRoomChange(
                                                                event,
                                                                setFieldValue
                                                            )
                                                        }
                                                        disabled={true}
                                                    >
                                                        {rooms?.length ===
                                                            0 && (
                                                            <option value="">
                                                                Vui lòng chọn
                                                                Tên Rạp trước
                                                            </option>
                                                        )}
                                                        {rooms?.length > 0 && (
                                                            <option value="">
                                                                Chọn phòng
                                                            </option>
                                                        )}
                                                        {rooms &&
                                                            rooms.map(
                                                                (room) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                room.roomId
                                                                            }
                                                                            value={
                                                                                room.roomId
                                                                            }
                                                                        >
                                                                            {
                                                                                room.roomName
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                    </Field>
                                                    <div className="error ms-3">
                                                        {errors.room &&
                                                        touched.room ? (
                                                            <div>
                                                                {errors.room}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="schedule-date"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Ngày chiếu:
                                                </label>
                                                <div className="col-md-10">
                                                    <Field
                                                        as="input"
                                                        className="form-control"
                                                        type="date"
                                                        id="schedule-date"
                                                        name="scheduleDate"
                                                        disabled={true}
                                                    />
                                                    <div className="error ms-3">
                                                        {errors.scheduleDate &&
                                                        touched.scheduleDate ? (
                                                            <div>
                                                                {
                                                                    errors.scheduleDate
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="html5-time-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Giờ chiếu
                                                </label>
                                                <div className="col-md-10">
                                                    <Field
                                                        as="input"
                                                        className="form-control"
                                                        type="time"
                                                        id="schedule-time"
                                                        name="scheduleTime"
                                                        format="HH:mm"
                                                        disabled={true}
                                                    />
                                                    <div className="error ms-3">
                                                        {errors.scheduleTime &&
                                                        touched.scheduleTime ? (
                                                            <div>
                                                                {
                                                                    errors.scheduleTime
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="movie"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Tên phim:
                                                </label>
                                                <div className="col-md-10">
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
                                                                {errors.movie}
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
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    </div>
                    {/* <!--/ Basic Bootstrap Table --> */}
                </div>
                {/* <!-- / Content --> */}

                <div className="content-backdrop fade"></div>
            </div>
        </>
    );
}

export default ScheduleFormUpdate;
