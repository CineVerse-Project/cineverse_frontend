import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBarAdmin() {
    const location = useLocation();
    const { pathname } = location;
    return (
        <>
            {/* <!-- Menu --> */}
            <aside
                id="layout-menu"
                className="layout-menu menu-vertical menu bg-menu-theme"
                style={{
                    position: "sticky",
                    top: "0",
                    height: "100vh",
                }}
            >
                <div className="app-brand demo">
                    <Link to="">
                        <div className="app-brand-link">
                            <span className="app-brand-logo demo">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3171/3171927.png"
                                    alt=""
                                    style={{ width: "30px" }}
                                />
                            </span>
                            <span className="app-brand-text demo menu-text fw-bolder ms-2">
                                Cineverse
                            </span>
                        </div>
                    </Link>

                    <button className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </button>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">
                    {/* <!-- Dashboard --> */}
                    <li
                        className={
                            pathname === "/" ? "menu-item active" : "menu-item"
                        }
                    >
                        <Link to="/">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                                <div data-i18n="Analytics">Dashboard</div>
                            </div>
                        </Link>
                    </li>

                    {/* <!-- Report --> */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Thống kê</span>
                    </li>
                    <li
                        className={
                            pathname === "/revenue-report"
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <Link to="/revenue-report">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-line-chart"></i>
                                <div>Thống kê doanh thu</div>
                            </div>
                        </Link>
                    </li>
                    <li
                        className={
                            pathname === "/ticket-report"
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <Link to="/ticket-report">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-bar-chart"></i>
                                <div>Thống kê vé đã bán</div>
                            </div>
                        </Link>
                    </li>
                    {/* <!-- Pages --> */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Phim</span>
                    </li>
                    <li
                        className={
                            pathname === "/movie"
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <Link to="/movie">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-film"></i>
                                <div>Phim</div>
                            </div>
                        </Link>
                    </li>
                    <li
                        className={
                            pathname === "/schedule"
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <Link to="/schedule">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-calendar"></i>
                                <div>Lịch chiếu</div>
                            </div>
                        </Link>
                    </li>
                    {/* <!-- Cinema --> */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Rạp chiếu</span>
                    </li>
                    <li
                        className={
                            pathname === "/theater"
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <Link to="/theater">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-building-house"></i>
                                <div>Rạp chiếu</div>
                            </div>
                        </Link>
                    </li>
                    <li
                        className={
                            pathname === "/room"
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <Link to="/room">
                            <div className="menu-link">
                                <i className="menu-icon tf-icons bx bx-home-heart"></i>
                                <div>Phòng chiếu</div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </aside>
            {/* <!-- / Menu --> */}
        </>
    );
}

export default SideBarAdmin;
