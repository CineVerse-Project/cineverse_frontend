import React from "react";
import { toast } from "react-toastify";
const options = {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
const Notification = {
toastSuccessNotification(successMessage){
    return toast.success(successMessage,options);
},
toastWarningNotification(warningMessage){
    return toast.warn(warningMessage,options);
},
toastErrorNotification(errorMessage){
    return toast.error(errorMessage,options);
}
}
export default Notification;