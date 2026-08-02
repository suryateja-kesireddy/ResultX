import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/dashboard/AdminSidebar";
import AdminTopbar from "../components/dashboard/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">

      {/* ================= Sidebar ================= */}
      <AdminSidebar />

      {/* ================= Main Content ================= */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navigation */}
        <AdminTopbar />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;