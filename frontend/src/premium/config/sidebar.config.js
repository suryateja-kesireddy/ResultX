import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  ClipboardCheck,
  BookOpen,
  Building2,
  Library,
  CalendarRange,
  CalendarDays,
  FileSpreadsheet,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarConfig = [
  {
    title: "MAIN",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/ui/admin",
      },
      {
        id: "accounts",
        label: "Account Management",
        icon: Users,
        path: "/ui/admin/accounts",
      },
      {
        id: "students",
        label: "Students",
        icon: GraduationCap,
        path: "/ui/admin/students",
      },
      {
        id: "hods",
        label: "HOD",
        icon: UserCog,
        path: "/ui/admin/hods",
      },
      {
        id: "exam-cell",
        label: "Exam Cell",
        icon: ClipboardCheck,
        path: "/ui/admin/exam-cell",
      },
    ],
  },

  {
    title: "ACADEMICS",
    items: [
      {
        id: "courses",
        label: "Courses",
        icon: BookOpen,
        path: "/ui/admin/courses",
      },
      {
        id: "departments",
        label: "Departments",
        icon: Building2,
        path: "/ui/admin/departments",
      },
      {
        id: "subjects",
        label: "Subjects",
        icon: Library,
        path: "/ui/admin/subjects",
      },
      {
        id: "semesters",
        label: "Semesters",
        icon: CalendarRange,
        path: "/ui/admin/semesters",
      },
      {
        id: "academic-years",
        label: "Academic Years",
        icon: CalendarDays,
        path: "/ui/admin/academic-years",
      },
    ],
  },

  {
    title: "RESULTS",
    items: [
      {
        id: "results",
        label: "Results",
        icon: FileSpreadsheet,
        path: "/ui/admin/results",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        path: "/ui/admin/analytics",
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        path: "/ui/admin/settings",
      },
      {
        id: "logout",
        label: "Logout",
        icon: LogOut,
        path: "/logout",
      },
    ],
  },
];

export default sidebarConfig;