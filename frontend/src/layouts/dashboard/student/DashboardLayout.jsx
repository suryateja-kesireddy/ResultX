import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/dashboard/student/Sidebar";
import Topbar from "../../../components/dashboard/student/Topbar";

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="dashboard-layout">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />

            {/* Main area */}
            <div className="dashboard-main">

                <Topbar
                    sidebarOpen={sidebarOpen}
                    onMenuClick={toggleSidebar}
                />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;