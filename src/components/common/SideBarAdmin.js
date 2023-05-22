import React from "react";

function SideBarAdmin() {
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
                    <a href="index.html" className="app-brand-link">
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
                    </a>

                    <button className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </button>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">
                    {/* <!-- Dashboard --> */}
                    <li className="menu-item active">
                        <a href="index.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>

                    {/* <!-- Report --> */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Thống kê</span>
                    </li>
                    <li className="menu-item">
                        <div className="menu-link">
                            <i className="menu-icon tf-icons bx bx-line-chart"></i>
                            <div>Thống kê doanh thu</div>
                        </div>
                        <div className="menu-link">
                            <i className="menu-icon tf-icons bx bx-bar-chart"></i>
                            <div>Thống kê vé đã bán</div>
                        </div>
                    </li>

                    {/* <!-- Pages --> */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Phim</span>
                    </li>
                    <li className="menu-item">
                        <a href=" " className="menu-link">
                            <i className="menu-icon tf-icons bx bx-film"></i>
                            <div>Phim</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href=" " className="menu-link">
                            <i className="menu-icon tf-icons bx bx-calendar"></i>
                            <div>Lịch chiếu</div>
                        </a>
                    </li>
                    {/* <!-- Cinema --> */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Rạp chiếu</span>
                    </li>
                    <li className="menu-item">
                        <a href=" " className="menu-link">
                            <i className="menu-icon tf-icons bx bx-building-house"></i>
                            <div>Rạp chiếu</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href=" " className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-heart"></i>
                            <div>Phòng chiếu</div>
                        </a>
                    </li>
                </ul>
            </aside>
            {/* <!-- / Menu --> */}
        </>
    );
}

export default SideBarAdmin;
