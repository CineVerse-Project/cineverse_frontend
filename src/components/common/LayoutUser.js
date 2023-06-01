import React from "react";
import { Outlet } from "react-router-dom";
import NavBarUser from "./NavBarUser";
import FooterUser from "./FooterUser";
import SideBarUser from "./SidebarUser";
import "../pages/user/style/css/home.css";
import ChatButton from "../chat/ChatButton";

function LayoutUser() {
    return (
        <div className="bodyTriLT6">
            <div className="navbar-home">
                <NavBarUser />
            </div>

            <div className="sidebar">
                <SideBarUser />
            </div>

            <div className="container-home">
                <Outlet />
            </div>

            <div>
                <ChatButton></ChatButton>
            </div>

            <footer className="footer-section">
                <FooterUser />
            </footer>
        </div>
    );
}

export default LayoutUser;
