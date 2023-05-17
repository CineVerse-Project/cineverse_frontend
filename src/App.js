import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/admin/Dashboard";

import HomeUser from "./components/common/HomeUser";
import LayoutAdmin from "./components/common/LayoutAdmin";
import RevenueReport from "./components/pages/admin/report/RevenueReport";
import TicketReport from "./components/pages/admin/report/TicketReport";

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
                            <Route path="revenue" element={<RevenueReport />} />
                            <Route path="ticket" element={<TicketReport />} />
                            <Route path="*" element={<Dashboard />} />
                        </Route>
                    )}

                    {/* Admin Side */}
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
