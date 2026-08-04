import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/dashboard/admin/Sidebar";
import Topbar from "../../../components/dashboard/admin/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">

      {/* ================= Sidebar ================= */}
      <Sidebar />

      {/* ================= Main Content ================= */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navigation */}
        <Topbar />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;