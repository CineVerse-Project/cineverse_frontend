import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/admin/Dashboard";

import HomeUser from "./components/common/HomeUser";
import LayoutAdmin from "./components/common/LayoutAdmin";
import RevenueReport from "./components/pages/admin/report/RevenueReport";

import ScheduleList from "./components/pages/admin/schedule/ScheduleList";
import ScheduleFormCreate from "./components/pages/admin/schedule/ScheduleFormCreate";
import ScheduleFormUpdate from "./components/pages/admin/schedule/ScheduleFormUpdate";
import TicketReport from "./components/pages/admin/report/TicketReport";
import ScheduleTest from "./components/pages/admin/schedule/ScheduleTest";

function App() {
    // Nếu muốn Hiển thị User Side thì sửa thành false, Admin Side thì true
    const isAdmin = true;

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Admin Side */}
                    {isAdmin && (
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
                                <Route path="test" element={<ScheduleTest />} />
                                <Route path="*" element={<ScheduleList />} />
                            </Route>
                            <Route path="*" element={<Dashboard />} />
                        </Route>
                    )}

                    {/* User Side */}
                    {!isAdmin && (
                        <Route path="/" element={<HomeUser />}>
                            {/* <Route index element={<Dashboard />} />
                            <Route path="revenue" element={<RevenueReport />} />
                            <Route path="*" element={<Dashboard />} /> */}
                        </Route>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
