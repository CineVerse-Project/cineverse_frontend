import React, { useState } from "react";
import adminService from "../../../../services/AdminServices";
import { getCurrentDate } from "../../../../utils/dateUtils";

function Top3Movie() {
    const [movies, setMovies] = useState();
    useState(() => {
        const currentDate = getCurrentDate();
        const getTop3MovieInMonth = () => {
            adminService
                .getTop3MovieInMonth(currentDate)
                .then((data) => {
                    setMovies(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getTop3MovieInMonth();
    }, []);
    return (
        <>
            {/* <!-- Transactions --> */}
            <div class="col-md-6 col-lg-6 order-2 mb-4">
                <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <h5 class="card-title m-0 me-2">
                            Top 3 phim bán chạy trong tháng
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="p-0 m-0">
                            {movies &&
                                movies.map((movie) => {
                                    return (
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="flex-shrink-0 me-3">
                                                <img
                                                    src={movie.imageUrl}
                                                    style={{
                                                        width: "3rem",
                                                        height: "4.5rem",
                                                    }}
                                                    alt="User"
                                                    class="rounded"
                                                />
                                            </div>
                                            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                <div class="me-2">
                                                    <h6 class="mb-0">
                                                        {movie.movieName}
                                                    </h6>
                                                    <small class="text-muted d-block mb-1">
                                                        {movie.movieType}
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
                                                        ).format(movie.revenue)}
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

export default Top3Movie;
