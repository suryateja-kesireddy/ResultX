import { Outlet } from "react-router-dom";

import HodSidebar from "../components/hod/HodSidebar";
import HodTopbar from "../components/hod/HodTopbar";

import "../styles/hod/hod-sidebar.css";
import "../styles/hod/hod-topbar.css";

function HodLayout() {
  return (
    <div className="hod-layout">

      <HodSidebar />

      <div className="hod-main">

        <HodTopbar />

        <main className="hod-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default HodLayout;