import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { toastConfig } from "./constants/config";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const toastConfig = {
//     position: toast.POSITION.TOP_CENTER,
//     autoClose: 1500,
// }
root.render(
    <React.StrictMode>
        <App />
        <ToastContainer
        {...toastConfig}
      />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
