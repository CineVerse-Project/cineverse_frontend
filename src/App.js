import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.css";
import Dashboard from "./components/pages/admin/Dashboard";
import HomeUser from "./components/common/HomeUser";
import SignUp from '../src/components/pages/user/SignUp'
import ForgotPassword from '../src/components/pages/user/ForgotPassword'
import ResetPassWord from '../src/components/pages/user/ResetPassword'
import LayoutAdmin from "./components/common/LayoutAdmin";
import LayoutUser from "./components/common/LayoutUser";
import RevenueReport from "./components/pages/admin/report/RevenueReport";
import TicketReport from "./components/pages/admin/report/TicketReport";
import ScheduleList from "./components/pages/admin/schedule/ScheduleList";
import MovieDetail from "./components/pages/user/views/MovieDetail";
import Home from "./components/pages/user/views/Home";
import MovieListIsShowing from "./components/pages/user/home/MovieListIsShowing";
import MovieListPremiereSoon from "./components/pages/user/home/MovieListPremiereSoon";
import MovieListTop10IsShowing from "./components/pages/user/home/MovieListTop10IsShowing";
import MovieInformation from "./components/pages/user/movieDetail/MovieInformation";
import SignIn from "./components/pages/user/SignIn";
import AdminSignIn from "./components/pages/admin/login/AdminSignIn";
import InformationLayout from "./components/pages/user/information/InformationLayout"
import UserInformation from "../src/components/pages/user/information/UserInformation"
import UpdateInformation from '../src/components/pages/user/information/UpdateInformation'
import ChangePassword from '../src/components/pages/user/information/ChangePassword'
import OrderHistory from '../src/components/pages/user/information/OrderHistory'
import EarnPoints from '../src/components/pages/user/information/EarnPoints'

function App() {
    // Nếu muốn Hiển thị User Side thì sửa thành false, Admin Side thì true
    const isAdmin = false;
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Admin Side */}
                    {isAdmin && (
                        <Route path="/" element={<LayoutAdmin />}>
                            <Route index element={<Dashboard />} />
                            <Route path="revenue" element={<RevenueReport />} />
                            <Route path="ticket" element={<TicketReport />} />
                            <Route path="schedule" element={<ScheduleList />} />
                            <Route path="*" element={<Dashboard />} />
                        </Route>
                    )}

                    {/* User Side */}
                    {!isAdmin && (
                        <Route path="/" element={<LayoutUser />}>
                            <Route index element={<Home />} />
                           
                            <Route path="movie-is-showing" element={<MovieListIsShowing />} />
                            <Route path="movie-premiere-soon" element={<MovieListPremiereSoon />} />
                            <Route path="movie-top-10-is-showing" element={<MovieListTop10IsShowing />} />
                            <Route path="movie-detail/:movieId" element={<MovieDetail />} />
                            {/**
                             * HuuNQ
                             */}
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/reset-password" element={<ResetPassWord />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            <Route path="/admin-sign-in" element={<AdminSignIn />} />
                            
                            <Route path="/user" element={<InformationLayout />}>
                                    <Route index path='/user/user-information' element={<UserInformation />}/>
                                    <Route  path='/user/update-information' element={<UpdateInformation />}/>
                                    <Route  path='/user/change-password' element={<ChangePassword />}/>
                                    <Route  path='/user/order-history' element={<OrderHistory />}/>
                                    <Route  path='/user/earn-points' element={<EarnPoints />}/>
                            </Route>

                            <Route path="*" element={<Home />} />
                        </Route>
                            )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
