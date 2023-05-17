import React from "react";
import { Outlet } from "react-router-dom";

function HomeUser() {
    return (
        <>
            <div>HomeUser</div>
            <Outlet />
        </>
    );
}

export default HomeUser;
