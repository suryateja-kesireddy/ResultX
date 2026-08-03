import { Routes, Route } from "react-router-dom";

import { HodProvider } from "../context/hod/HodContext";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import HodLayout from "../layouts/HodLayout";
import PremiumAdminLayout from "../premium/layouts/PremiumAdminLayout";

// Authentication
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

// Login Pages
import LoginSelection from "../pages/auth/LoginSelection";
import StudentLogin from "../pages/auth/StudentLogin";
import HodLogin from "../pages/auth/HodLogin";
import ExamCellLogin from "../pages/auth/ExamCellLogin";
import AdminLogin from "../pages/auth/AdminLogin";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Student Dashboard
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import Results from "../pages/dashboard/Results";
import Profile from "../pages/dashboard/Profile";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import CreateAccount from "../pages/admin/accounts/CreateAccount";

// Premium Admin UI
import AdminUIDemo from "../premium/pages/AdminUIDemo";
import AccountForm from "../pages/admin/accounts/AccountForm";

// HOD Pages
import HodDashboard from "../pages/hod/HodDashboard";
import HodStudents from "../pages/hod/Students";
import HodFaculty from "../pages/hod/Faculty";
import HodSubjects from "../pages/hod/Subjects";
import HodResults from "../pages/hod/Results";
import HodAnalytics from "../pages/hod/Analytics";
import HodNotifications from "../pages/hod/Notifications";
import HodProfile from "../pages/hod/Profile";
import HodSettings from "../pages/hod/Settings";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<LoginSelection />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/hod/login" element={<HodLogin />} />
      <Route path="/examcell/login" element={<ExamCellLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ================= STUDENT ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="results" element={<Results />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts/create" element={<CreateAccount />} />
      </Route>

      {/* ================= HOD ================= */}
      <Route
  path="/hod"
  element={
    <ProtectedRoute role="HOD">
      <HodProvider>
        <HodLayout />
      </HodProvider>
    </ProtectedRoute>
  }
>
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="students" element={<HodStudents />} />
        <Route path="faculty" element={<HodFaculty />} />
        <Route path="subjects" element={<HodSubjects />} />
        <Route path="results" element={<HodResults />} />
        <Route path="analytics" element={<HodAnalytics />} />
        <Route path="notifications" element={<HodNotifications />} />
        <Route path="profile" element={<HodProfile />} />
        <Route path="settings" element={<HodSettings />} />
      </Route>

      {/* ================= PREMIUM ADMIN UI ================= */}
      <Route
        path="/ui"
        element={
          <ProtectedRoute role="ADMIN">
            <PremiumAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="admin" element={<AdminUIDemo />} />
        <Route
          path="admin/accounts/create"
          element={<AccountForm />}
        />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;