import React from "react";

function NavBarAdmin() {
    return (
        <>
            {/* <!-- Navbar --> */}
            <nav
                class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
                style={{
                    position: "sticky",
                    top: "0",
                }}
            >
                <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a class="nav-item nav-link px-0 me-xl-4" href=" ">
                        <i class="bx bx-menu bx-sm"></i>
                    </a>
                </div>

                <div
                    class="navbar-nav-right d-flex align-items-center"
                    id="navbar-collapse"
                >
                    <ul class="navbar-nav flex-row align-items-center ms-auto">
                        {/* <!-- Place this tag where you want the button to render. --> */}
                        <li class="nav-item lh-1 me-3">Phan An</li>

                        {/* <!-- User --> */}
                        <li class="nav-item navbar-dropdown dropdown-user dropdown">
                            <a
                                class="nav-link dropdown-toggle hide-arrow"
                                href=" "
                                data-bs-toggle="dropdown"
                            >
                                <div class="avatar avatar-online">
                                    <img
                                        src="../../../static/assets/img/avatars/1.png"
                                        alt=""
                                        class="w-px-40 h-auto rounded-circle"
                                    />
                                </div>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a class="dropdown-item" href=" ">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar avatar-online">
                                                    <img
                                                        src="../../../static/assets/img/avatars/1.png"
                                                        alt=""
                                                        class="w-px-40 h-auto rounded-circle"
                                                    />
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <span class="fw-semibold d-block">
                                                    Phan An
                                                </span>
                                                <small class="text-muted">
                                                    Admin
                                                </small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div class="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a class="dropdown-item" href=" ">
                                        <i class="bx bx-user me-2"></i>
                                        <span class="align-middle">
                                            Thông tin của tôi
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href=" ">
                                        <i class="bx bx-cog me-2"></i>
                                        <span class="align-middle">
                                            Cài đặt
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <div class="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="auth-login-basic.html"
                                    >
                                        <i class="bx bx-power-off me-2"></i>
                                        <span class="align-middle">
                                            Đăng xuất
                                        </span>
                                    </a>
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
