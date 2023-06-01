import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
function NavBarAdmin() {
    const {auth} = useAuth();
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    // const username = localStorage.getItem('username') ? localStorage.getItem('username') : null;
    // const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
    // const roles = localStorage.getItem('roles') ? localStorage.getItem('roles') : null;
    const usernameAuth = auth?.username ? auth?.username : null;
    const roles = auth?.roles ? auth?.roles : null;
    const tokens = auth?.token ? auth?.token : null;
    const navigate = useNavigate();
    useEffect(() => {
        if(usernameAuth!== null){
            setUser(usernameAuth);
        }
        if(roles!==null){
            setRole(roles);
        }
        if(tokens!==null){
            setToken(tokens);
        }
        // if (username) {
        // setUser(username);
        // } else {
        // setUser(null);
        // }
        // if (accessToken) {
        // setToken(accessToken)
        // } else {
        // setToken(null);
        // }
        // if (roles) {
        // setRole(roles);
        // } else {
        // setRole(null);
        // }
    // }, [user, token, role, username, accessToken, roles])
    }, [usernameAuth,roles,tokens])
    const handleSignOut = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("access_token");
        localStorage.removeItem("roles");
        window.location.reload();
        navigate("/admin-sign-in"); 
    }
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
                        <li className="nav-item lh-1 me-3">{user}</li>

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
                                                    {user}
                                                </span>
                                                <small className="text-muted">
                                                    {role}
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
                                        <span className="align-middle" onClick={handleSignOut}>
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
