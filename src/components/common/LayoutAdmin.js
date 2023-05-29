import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";
import NavBarAdmin from "./NavBarAdmin";

function LayoutAdmin() {
    return (
        <>
            {/* <!-- Layout wrapper --> */}
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <SideBarAdmin />
                    <div className="layout-page">
                        <NavBarAdmin />
                        <div className="content-wrapper">
                            <Outlet />
                        </div>
                    </div>
                </div>

                {/* <!-- Overlay --> */}
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
            {/* Layout wrapper  */}
        </>
    );
}

export default LayoutAdmin;
