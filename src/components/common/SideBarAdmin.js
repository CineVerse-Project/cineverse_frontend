import React from "react";

function SideBarAdmin() {
    return (
        <>
            {/* <!-- Menu --> */}
            <aside
                id="layout-menu"
                class="layout-menu menu-vertical menu bg-menu-theme"
                style={{
                    position: "sticky",
                    top: "0",
                    height: "100vh",
                }}
            >
                <div class="app-brand demo">
                    <a href="index.html" class="app-brand-link">
                        <span class="app-brand-logo demo">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3171/3171927.png"
                                alt=""
                                style={{ width: "30px" }}
                            />
                        </span>
                        <span class="app-brand-text demo menu-text fw-bolder ms-2">
                            Cineverse
                        </span>
                    </a>

                    <a
                        href=" "
                        class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                    >
                        <i class="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div class="menu-inner-shadow"></div>

                <ul class="menu-inner py-1">
                    {/* <!-- Dashboard --> */}
                    <li class="menu-item active">
                        <a href="index.html" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>

                    {/* <!-- Report --> */}
                    <li class="menu-header small text-uppercase">
                        <span class="menu-header-text">Thống kê</span>
                    </li>
                    <li class="menu-item">
                        <div class="menu-link">
                            <i class="menu-icon tf-icons bx bx-line-chart"></i>
                            <div>Thống kê doanh thu</div>
                        </div>
                        <div class="menu-link">
                            <i class="menu-icon tf-icons bx bx-bar-chart"></i>
                            <div>Thống kê vé đã bán</div>
                        </div>
                    </li>

                    {/* <!-- Pages --> */}
                    <li class="menu-header small text-uppercase">
                        <span class="menu-header-text">Phim</span>
                    </li>
                    <li class="menu-item">
                        <a href=" " class="menu-link">
                            <i class="menu-icon tf-icons bx bx-film"></i>
                            <div>Phim</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href=" " class="menu-link">
                            <i class="menu-icon tf-icons bx bx-calendar"></i>
                            <div>Lịch chiếu</div>
                        </a>
                    </li>
                    {/* <!-- Cinema --> */}
                    <li class="menu-header small text-uppercase">
                        <span class="menu-header-text">Rạp chiếu</span>
                    </li>
                    <li class="menu-item">
                        <a href=" " class="menu-link">
                            <i class="menu-icon tf-icons bx bx-building-house"></i>
                            <div>Rạp chiếu</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href=" " class="menu-link">
                            <i class="menu-icon tf-icons bx bx-home-heart"></i>
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
