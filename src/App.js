import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/pages/admin/Dashboard";

import LayoutAdmin from "./components/common/LayoutAdmin";
import LayoutUser from "./components/common/LayoutUser";
import RevenueReport from "./components/pages/admin/report/RevenueReport";

import ScheduleList from "./components/pages/admin/schedule/ScheduleList";

import ScheduleFormCreate from "./components/pages/admin/schedule/ScheduleFormCreate";
import ScheduleFormUpdate from "./components/pages/admin/schedule/ScheduleFormUpdate";
import TicketReport from "./components/pages/admin/report/TicketReport";
import ScheduleTest from "./components/pages/admin/schedule/ScheduleTest";

import ShowTimeScreen from "./components/pages/user/page/showtime/ShowTimeScreen";
import ShowSeatScreen from "./components/pages/user/page/showtime/ShowSeatScreen";
import Payment from "./components/pages/user/page/showtime/Payment";
import CheckOut from "./components/pages/user/page/showtime/CheckOut";
import MovieDetail from "./components/pages/user/views/MovieDetail";
import Home from "./components/pages/user/views/Home";
import MovieListIsShowing from "./components/pages/user/home/MovieListIsShowing";
import MovieListPremiereSoon from "./components/pages/user/home/MovieListPremiereSoon";
import MovieListTop10IsShowing from "./components/pages/user/home/MovieListTop10IsShowing";
import MovieInformation from "./components/pages/user/movieDetail/MovieInformation";
import ManageTheater from "./components/pages/admin/theater/ManageTheater";
import ManageMovie from "./components/pages/admin/movie/ManageMovie";
import ManageRoom from "./components/pages/admin/room/ManageRoom";
import CreateRoom from "./components/pages/admin/room/CreateRoom";
import CreateTheater from "./components/pages/admin/theater/CreateTheater";
import EditTheater from "./components/pages/admin/theater/EditTheater";
import CreateMovie from "./components/pages/admin/movie/CreateMovie";
import EditRoom from "./components/pages/admin/room/EditRoom";
import EditMovie from "./components/pages/admin/movie/EditMovie";
import SignUp from "../src/components/pages/user/information/SignUp";
import ForgotPassword from "../src/components/pages/user/information/ForgotPassword";
import ResetPassWord from "../src/components/pages/user/information/ResetPassword";
import SignIn from "./components/pages/user/information/SignIn";
import AdminSignIn from "./components/pages/admin/login/AdminSignIn";
import InformationLayout from "./components/pages/user/information/InformationLayout";
import UserInformation from "../src/components/pages/user/information/UserInformation";
import UpdateInformation from "../src/components/pages/user/information/UpdateInformation";
import ChangePassword from "../src/components/pages/user/information/ChangePassword";
import OrderHistory from "../src/components/pages/user/information/OrderHistory";
import EarnPoints from "../src/components/pages/user/information/EarnPoints";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./components/chat/Chat";
import ChatUser from "./components/chat/ChatUser";
import AdminChat from "./components/chat/AdminChat";
import RequireAuth from "./components/common/RequiredAuth";
import useAuth from "./auth/useAuth";
function App() {
    // Nếu muốn Hiển thị User Side thì sửa thành false, Admin Side thì true
    const { auth } = useAuth();
    const [admin, setAdmin] = useState(false);
    const role = auth?.roles ? auth?.roles : null;
    useEffect(() => {
        if (role !== null) {
            if (role?.indexOf("ROLE_ADMIN") !== -1) {
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        }
    }, [role]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="admin-sign-in" element={<AdminSignIn />} />
                    {/* Admin Side */}
                    {admin && (
                        <Route
                            element={
                                <RequireAuth allowedRoles={"ROLE_ADMIN"} />
                            }
                        >
                            <Route path="/" element={<LayoutAdmin />}>
                                <Route index element={<Dashboard />} />

                                <Route
                                    path="revenue-report"
                                    element={<RevenueReport />}
                                />
                                <Route
                                    path="ticket-report"
                                    element={<TicketReport />}
                                />
                                <Route path="schedule">
                                    <Route path="" element={<ScheduleList />} />
                                    <Route
                                        path="create"
                                        element={<ScheduleFormCreate />}
                                    />
                                    <Route
                                        path="update/:scheduleId/:roomId"
                                        element={<ScheduleFormUpdate />}
                                    />
                                    <Route
                                        path="test"
                                        element={<ScheduleTest />}
                                    />
                                    <Route
                                        path="*"
                                        element={<ScheduleList />}
                                    />
                                </Route>
                                <Route
                                    path="theater"
                                    element={<ManageTheater />}
                                />
                                <Route
                                    path="createTheater"
                                    element={<CreateTheater />}
                                />
                                <Route
                                    path="editTheater/:theaterId"
                                    element={<EditTheater />}
                                />
                                <Route
                                    path="editMovie/:movieId"
                                    element={<EditMovie />}
                                />
                                <Route
                                    path="editRoom/:roomId"
                                    element={<EditRoom />}
                                />
                                <Route path="movie" element={<ManageMovie />} />
                                <Route path="room" element={<ManageRoom />} />
                                <Route
                                    path="createRoom"
                                    element={<CreateRoom />}
                                />
                                <Route
                                    path="createMovie"
                                    element={<CreateMovie />}
                                />
                                <Route
                                    path="admin-chat"
                                    element={<AdminChat />}
                                />
                                <Route path="*" element={<Dashboard />} />
                            </Route>
                        </Route>
                    )}
                    <Route path="admin-sign-in" element={<AdminSignIn />} />
                    {/* User Side */}
                    {!admin && (
                        <Route path="/" element={<LayoutUser />}>
                            <Route index element={<Home />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/chatUser" element={<ChatUser />} />
                            <Route
                                path="showtime"
                                element={<ShowTimeScreen />}
                            />
                            <Route path="seat" element={<ShowSeatScreen />} />
                            <Route path="payment" element={<Payment />} />
                            <Route path="checkout" element={<CheckOut />} />

                            <Route
                                path="movie-is-showing"
                                element={<MovieListIsShowing />}
                            />
                            <Route
                                path="movie-premiere-soon"
                                element={<MovieListPremiereSoon />}
                            />
                            <Route
                                path="movie-top-10-is-showing"
                                element={<MovieListTop10IsShowing />}
                            />
                            <Route
                                path="movie-detail/:movieId"
                                element={<MovieDetail />}
                            />

                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="sign-up" element={<SignUp />} />

                            <Route
                                path="reset-password"
                                element={<ResetPassWord />}
                            />
                            <Route
                                path="forgot-password"
                                element={<ForgotPassword />}
                            />

                            <Route
                                element={
                                    <RequireAuth allowedRoles={"ROLE_USER"} />
                                }
                            >
                                <Route
                                    path="user"
                                    element={<InformationLayout />}
                                >
                                    <Route
                                        index
                                        path=":username"
                                        element={<UserInformation />}
                                    />
                                    <Route
                                        path="update-information/:username"
                                        element={<UpdateInformation />}
                                    />
                                    <Route
                                        path="change-password/:username"
                                        element={<ChangePassword />}
                                    />
                                    <Route
                                        path="order-history/:username"
                                        element={<OrderHistory />}
                                    />
                                    <Route
                                        path="earn-points/:username"
                                        element={<EarnPoints />}
                                    />
                                </Route>
                                <Route path="*" element={<Home />} />
                            </Route>
                        </Route>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
