import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  Layers,
  CalendarDays,
  ClipboardList,
  FileBarChart2,
  Settings,
  LogOut,
} from "lucide-react";
const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Account Management",
    icon: Users,
    path: "/admin/accounts",
  },
  {
    title: "Students",
    icon: GraduationCap,
    path: "/admin/students",
  },
  {
    title: "HODs",
    icon: Users,
    path: "/admin/hods",
  },
  {
  title: "Faculty",
  icon: Users,
  path: "/admin/faculty",
},
  {
    title: "Subjects",
    icon: BookOpen,
    path: "/admin/subjects",
  },
  {
    title: "Departments",
    icon: Building2,
    path: "/admin/departments",
  },
  {
    title: "Courses",
    icon: Layers,
    path: "/admin/courses",
  },
  {
    title: "Semesters",
    icon: CalendarDays,
    path: "/admin/semesters",
  },
  {
    title: "Academic Years",
    icon: ClipboardList,
    path: "/admin/academic-years",
  },
  {
    title: "Results",
    icon: FileBarChart2,
    path: "/admin/results",
  },
];
const AdminSidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      {/* ================= Logo ================= */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold tracking-wide">
          Result<span className="text-blue-400">X</span>
        </h1>
      </div>

      {/* ================= Navigation ================= */}
      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* ================= Logout ================= */}
      <div className="border-t border-slate-700 p-4">

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;6