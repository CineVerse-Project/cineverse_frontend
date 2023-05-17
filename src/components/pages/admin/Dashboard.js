import React from "react";

function Dashboard() {
    return (
        <>
            {/* <!-- Content wrapper --> */}
            <div class="content-wrapper">
                {/* <!-- Content --> */}
                <div class="container-xxl flex-grow-1 container-p-y">
                    <div class="row">
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
                                                Để tùy chỉnh thống kê vui lòng
                                                chọn
                                                <span class="fw-bold">
                                                    Xem thống kê chi tiết
                                                </span>
                                            </p>

                                            <a
                                                href=" "
                                                class="btn btn btn-primary"
                                            >
                                                Xem thống kê chi tiết
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-sm-5 text-center text-sm-left">
                                        <div class="card-body pb-0 px-0 px-md-4">
                                            <img
                                                src="./static/assets/img/illustrations/man-with-laptop-light.png"
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
                        {/* <!-- Total Revenue --> */}
                        <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                            <div class="card">
                                <div class="row row-bordered g-0">
                                    <div class="col-md-12">
                                        <h5 class="card-header m-0 me-2 pb-3">
                                            Tổng doanh thu
                                        </h5>
                                        <div
                                            id="totalRevenueChart"
                                            class="px-2"
                                        ></div>
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
                                                <div class="dropdown">
                                                    <button
                                                        class="btn p-0"
                                                        type="button"
                                                        id="cardOpt4"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i class="bx bx-dots-vertical-rounded"></i>
                                                    </button>
                                                    <div
                                                        class="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="cardOpt4"
                                                    >
                                                        <a
                                                            class="dropdown-item"
                                                            href=" "
                                                        >
                                                            View More
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="d-block mb-1">
                                                Doanh thu cao nhất
                                            </span>
                                            <h4 class="card-title text-nowrap mb-2">
                                                122,456,000đ
                                            </h4>
                                            <small class="text-danger fw-semibold">
                                                <i class="bx bx-down-arrow-alt"></i>
                                                -14.82%
                                            </small>
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
                                                <div class="dropdown">
                                                    <button
                                                        class="btn p-0"
                                                        type="button"
                                                        id="cardOpt1"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i class="bx bx-dots-vertical-rounded"></i>
                                                    </button>
                                                    <div
                                                        class="dropdown-menu"
                                                        aria-labelledby="cardOpt1"
                                                    >
                                                        <a
                                                            class="dropdown-item"
                                                            href=" "
                                                        >
                                                            View More
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="fw-semibold d-block mb-1">
                                                Doanh thu thấp nhất
                                            </span>
                                            <h4 class="card-title mb-2">
                                                54,512,123đ
                                            </h4>
                                            <small class="text-success fw-semibold">
                                                <i class="bx bx-up-arrow-alt"></i>
                                                +28.14%
                                            </small>
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
                                                        <small class="text-success text-nowrap fw-semibold">
                                                            <i class="bx bx-chevron-up"></i>
                                                            68.2%
                                                        </small>
                                                        <h4 class="mb-0">
                                                            84,686,000đ
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
                    <div class="row">
                        {/* <!-- Expense Overview --> */}
                        <div class="col-md-6 col-lg-6 order-1 mb-4">
                            <div class="card h-100">
                                <div>
                                    <h5 class="card-header m-0 me-2">
                                        Vé đã bán
                                    </h5>
                                </div>
                                <div class="card-body px-0">
                                    <div class="tab-content p-0">
                                        <div
                                            class="tab-pane fade show active"
                                            id="navs-tabs-line-card-income"
                                            role="tabpanel"
                                        >
                                            <div class="d-flex p-4 pt-0">
                                                <div class="avatar flex-shrink-0 me-3">
                                                    <i className="bx bx-wallet text-primary"></i>
                                                </div>
                                                <div>
                                                    <small class="text-muted d-block">
                                                        Vé đã bán trung bình
                                                    </small>
                                                    <div class="d-flex align-items-center">
                                                        <h6 class="mb-0 me-1">
                                                            4000
                                                        </h6>
                                                        <small class="text-success fw-semibold">
                                                            <i class="bx bx-chevron-up"></i>
                                                            42.9%
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="incomeChart"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--/ Expense Overview --> */}

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
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="flex-shrink-0 me-3">
                                                <img
                                                    src="https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/l/m/lm6_2x3_layout.jpg"
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
                                                        Lật mặt 6
                                                    </h6>
                                                    <small class="text-muted d-block mb-1">
                                                        Phim Việt Nam
                                                    </small>
                                                </div>
                                                <div class="user-progress d-flex align-items-center gap-1">
                                                    <h6 class="mb-0">
                                                        423,563,000
                                                    </h6>
                                                    <span class="text-muted">
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="flex-shrink-0 me-3">
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/vi/9/90/GOTG_3_VN_poster.jpg"
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
                                                        Chiến Binh Dải Ngân Hà 3
                                                    </h6>
                                                    <small class="text-muted d-block mb-1">
                                                        Phim Marvel
                                                    </small>
                                                </div>
                                                <div class="user-progress d-flex align-items-center gap-1">
                                                    <h6 class="mb-0">
                                                        323,233,000
                                                    </h6>
                                                    <span class="text-muted">
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="flex-shrink-0 me-3">
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/vi/2/22/Fast_X_VN_poster.jpg"
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
                                                        Fast And Furious 10
                                                    </h6>
                                                    <small class="text-muted d-block mb-1">
                                                        Phim Hành động
                                                    </small>
                                                </div>
                                                <div class="user-progress d-flex align-items-center gap-1">
                                                    <h6 class="mb-0">
                                                        253,359,000
                                                    </h6>
                                                    <span class="text-muted">
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!--/ Transactions --> */}
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
