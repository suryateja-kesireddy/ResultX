import { Routes, Route } from "react-router-dom";

import { HodProvider } from "../context/hod/HodContext";

// Layouts
import MainLayout from "../layouts/public/MainLayout";

import DashboardLayout from "../layouts/dashboard/student/DashboardLayout";

import AdminLayout from "../layouts/dashboard/admin/AdminLayout";

import HodLayout from "../layouts/dashboard/hod/HodLayout";

import ExamCellLayout from "../layouts/dashboard/examcell/ExamCellLayout";

import ExamCellProvider from "../context/examcell/ExamCellContext";

import PremiumAdminLayout from "../layouts/dashboard/admin/PremiumAdminLayout";

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
import StudentDashboard from "../pages/student/Dashboard";
import Results from "../pages/student/Results";
import Profile from "../pages/student/Profile";
import Notifications from "../pages/student/Notifications";
import Settings from "../pages/student/Settings";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import CreateAccount from "../pages/admin/accounts/CreateAccount";

// Premium Admin UI
import AdminUIDemo from "../pages/admin/AdminUIDemo";
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


// Exam Cell Pages
import ExamCellDashboard from "../pages/examcell/ExamCellDashboard";
import ExamCellExams from "../pages/examcell/Exams";
import ExamCellResults from "../pages/examcell/Results";
import ExamCellSubjects from "../pages/examcell/Subjects";
import ExamCellSchedule from "../pages/examcell/Schedule";
import ExamCellAnalytics from "../pages/examcell/Analytics";
import ExamCellNotifications from "../pages/examcell/Notifications";
import ExamCellProfile from "../pages/examcell/Profile";
import ExamCellSettings from "../pages/examcell/Settings";

//AppRoutes Component
// Premium Admin Pages
import AccountList from "../pages/admin/accounts/AccountList";

import Students from "../pages/admin/students/Students";
import HODs from "../pages/admin/hods/HODs";
import Faculty from "../pages/admin/faculty/Faculty";
import ExamCell from "../pages/admin/examcell/ExamCell";
import Courses from "../pages/admin/courses/Courses";
import Departments from "../pages/admin/departments/Departments";
import Subjects from "../pages/admin/subjects/Subjects";
import Semesters from "../pages/admin/semester/Semester";
import AcademicYears from "../pages/admin/academicyears/AcademicYears";
import AdminResults from "../pages/admin/results/Results";
import AdminAnalytics from "../pages/admin/analytics/Analytics";
import AdminSettings from "../pages/admin/settings/Settings";



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

      {/* ================= EXAM CELL ================= */}
      <Route
        path="/examcell"
        element={
          <ProtectedRoute role="EXAM_CELL">
            <ExamCellProvider>
              <ExamCellLayout />
            </ExamCellProvider>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ExamCellDashboard />} />
        <Route path="exams" element={<ExamCellExams />} />
        <Route path="results" element={<ExamCellResults />} />
        <Route path="subjects" element={<ExamCellSubjects />} />
        <Route path="schedule" element={<ExamCellSchedule />} />
        <Route path="analytics" element={<ExamCellAnalytics />} />
        <Route path="notifications" element={<ExamCellNotifications />} />
        <Route path="profile" element={<ExamCellProfile />} />
        <Route path="settings" element={<ExamCellSettings />} />
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


        <Route
          path="admin/accounts"
          element={<AccountList />}
        />

        <Route
          path="admin/students"
          element={<Students />}
        />

        <Route
          path="admin/hods"
          element={<HODs />}
        />
        <Route
          path="admin/faculty"
          element={<Faculty />}
        />
        <Route
          path="admin/exam-cell"
          element={<ExamCell />}
        />

        <Route
          path="admin/courses"
          element={<Courses />}
        />

        <Route
          path="admin/departments"
          element={<Departments />}
        />

        <Route
          path="admin/subjects"
          element={<Subjects />}
        />

        <Route
          path="admin/semesters"
          element={<Semesters />}
        />

        <Route
          path="admin/academic-years"
          element={<AcademicYears />}
        />

        <Route
          path="admin/results"
          element={<AdminResults />}
        />

        <Route
          path="admin/analytics"
          element={<AdminAnalytics />}
        />

        <Route
          path="admin/settings"
          element={<AdminSettings />}
        />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;