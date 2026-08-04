import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/dashboard/student/Sidebar";
import Topbar from "../../../components/dashboard/student/Topbar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;