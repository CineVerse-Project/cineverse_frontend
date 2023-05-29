import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/admin/Dashboard";

import HomeUser from "./components/common/HomeUser";
import LayoutAdmin from "./components/common/LayoutAdmin";
import RevenueReport from "./components/pages/admin/report/RevenueReport";
import TicketReport from "./components/pages/admin/report/TicketReport";
import ScheduleList from "./components/pages/admin/schedule/ScheduleList";
import ShowTimeScreen from "./components/pages/user/page/showtime/ShowTimeScreen";
import ShowSeatScreen from "./components/pages/user/page/showtime/ShowSeatScreen";
import Payment from "./components/pages/user/page/showtime/Payment";
import CheckOut from "./components/pages/user/page/showtime/CheckOut";

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
                        <Route path="/" element={<HomeUser />}>
                            <Route path="showtime" element={<ShowTimeScreen />} />
                            <Route path="seat" element={<ShowSeatScreen/>}/>
                            <Route path="payment" element={<Payment/>}/>
                            <Route path="checkout" element={<CheckOut/>}/>
                        </Route>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
