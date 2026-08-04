import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/dashboard/examcell/Sidebar";
import Topbar from "../../../components/dashboard/examcell/Topbar";

import "../../../styles/dashboard/examcell/sidebar.css";
import "../../../styles/dashboard/examcell/topbar.css";
import "../../../styles/dashboard/examcell/dashboard.css";

function ExamCellLayout() {
  return (
    <div className="examcell-layout">

      <Sidebar />

      <div className="examcell-main">

        <Topbar />

        <main className="examcell-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default ExamCellLayout;