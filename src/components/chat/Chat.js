import React from "react";
import AdminChat from "./AdminChat";
import UserChat from "./UserChat";

function Chat() {
    return (
        <div style={{ margin: "50px" }} className="ms-3 ps-5">
            <AdminChat />
        </div>
    );
}

export default Chat;
