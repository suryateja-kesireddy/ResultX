import { Bell, Search, UserCircle } from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">

      {/* Left Side */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back, Administrator 👋
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />

        </div>

        {/* Notification */}
        <button className="rounded-xl p-2 hover:bg-slate-100">

          <Bell size={22} />

        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-xl p-2 hover:bg-slate-100">

          <UserCircle size={34} />

          <div className="text-left">

            <p className="font-semibold text-slate-700">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

        </button>

      </div>

    </header>
  );
};

export default AdminTopbar;