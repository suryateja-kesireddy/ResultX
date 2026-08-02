import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

import StudentLogin from "../pages/auth/StudentLogin";
import HodLogin from "../pages/auth/HodLogin";
import ExamCellLogin from "../pages/auth/ExamCellLogin";
import AdminLogin from "../pages/auth/AdminLogin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LoginSelection from "../pages/auth/LoginSelection";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import Results from "../pages/dashboard/Results";
import Profile from "../pages/dashboard/Profile";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import CreateAccount from "../pages/admin/accounts/CreateAccount";
import PremiumAdminLayout from "../premium/layouts/PremiumAdminLayout";
import AdminUIDemo from "../premium/pages/AdminUIDemo";
import AccountForm from "../pages/admin/accounts/AccountForm";
function AppRoutes() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<LoginSelection />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/hod/login" element={<HodLogin />} />
      <Route path="/examcell/login" element={<ExamCellLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
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
      {/* Admin Dashboard */}
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="accounts/create" element={<CreateAccount />} />
</Route>
{/* Premium UI */}
<Route path="/ui" element={<PremiumAdminLayout />}>

  {/* Dashboard */}
  <Route path="admin" element={<AdminUIDemo />} />

  {/* Account Management */}
  <Route
    path="admin/accounts/create"
    element={<AccountForm />}
  />

</Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;