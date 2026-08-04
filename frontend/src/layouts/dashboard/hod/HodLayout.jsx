import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/dashboard/hod/Sidebar";
import Topbar from "../../../components/dashboard/hod/Topbar";

import "../../../styles/dashboard/hod/sidebar.css";
import "../../../styles/dashboard/hod/topbar.css";

function HodLayout() {
  return (
    <div className="hod-layout">

      <Sidebar />

      <div className="hod-main">

        <Topbar />

        <main className="hod-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default HodLayout;