import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";
import NavBarAdmin from "./NavBarAdmin";

function LayoutAdmin() {
    return (
        <>
            {/* <!-- Layout wrapper --> */}
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
                    <SideBarAdmin />
                    <div class="layout-page">
                        <NavBarAdmin />
                        <div class="content-wrapper">
                            <Outlet />
                        </div>
                    </div>
                </div>

                {/* <!-- Overlay --> */}
                <div class="layout-overlay layout-menu-toggle"></div>
            </div>
            {/* Layout wrapper  */}
        </>
    );
}

export default LayoutAdmin;
