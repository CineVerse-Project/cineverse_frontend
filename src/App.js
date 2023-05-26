import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/admin/Dashboard";

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
                            <Route path="*" element={<Home />} />
                        </Route>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
