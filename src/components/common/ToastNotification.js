import React from "react";
import { toast } from "react-toastify";

const ToastNotification = () => {
    const options = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const toastNotification = () => {
        return toast("Thanh cong", options);
    }
    return (
        <div className="toastify">

        </div>
    )
}

export default ToastNotification;