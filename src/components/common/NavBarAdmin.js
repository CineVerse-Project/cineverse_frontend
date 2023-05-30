import React from "react";

function NavBarAdmin() {
    return (
        <>
            {/* <!-- Navbar --> */}
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
                style={{
                    position: "sticky",
                    top: "0",
                }}
            >
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <div className="nav-item nav-link px-0 me-xl-4">
                        <i className="bx bx-menu bx-sm"></i>
                    </div>
                </div>

                <div
                    className="navbar-nav-right d-flex align-items-center"
                    id="navbar-collapse"
                >
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* <!-- Place this tag where you want the button to render. --> */}
                        <li className="nav-item lh-1 me-3">Phan An</li>

                        {/* <!-- User --> */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <div
                                className="nav-link dropdown-toggle hide-arrow"
                                href=" "
                                data-bs-toggle="dropdown"
                            >
                                <div className="avatar avatar-online">
                                    <img
                                        src="../../../static/assets/img/avatars/1.png"
                                        alt=""
                                        className="w-px-40 h-auto rounded-circle"
                                    />
                                </div>
                            </div>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button className="dropdown-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img
                                                        src="../../../static/assets/img/avatars/1.png"
                                                        alt=""
                                                        className="w-px-40 h-auto rounded-circle"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="fw-semibold d-block">
                                                    Phan An
                                                </span>
                                                <small className="text-muted">
                                                    Admin
                                                </small>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <button className="dropdown-item">
                                        <i className="bx bx-user me-2"></i>
                                        <span className="align-middle">
                                            Thông tin của tôi
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" href=" ">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">
                                            Cài đặt
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        href="auth-login-basic.html"
                                    >
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">
                                            Đăng xuất
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <!-- / Navbar --> */}
        </>
    );
}

export default NavBarAdmin;
