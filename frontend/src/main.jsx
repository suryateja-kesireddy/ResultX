import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/auth/AuthContext";
import { COLLEGE } from "./constants/college";

import "./styles/globals.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/hero.css";
import "./styles/auth.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/login-selection.css";
import "./styles/dashboard/student/dashboard.css";
import "./styles/about.css";
import "./styles/contact.css";

import "./styles/dashboard/admin/premium.css";
import "./styles/dashboard/admin/topbar.css";
import "./styles/dashboard/admin/account.css";

import "./styles/dashboard/admin/account-header.css";
import "./styles/dashboard/admin/account-stats.css";
import "./styles/dashboard/admin/account-filters.css";
import "./styles/dashboard/admin/account-table.css";
import "./styles/dashboard/admin/status-badge.css";
import "./styles/dashboard/admin/action-buttons.css";
import "./styles/dashboard/admin/view-account-modal.css";
import "./styles/dashboard/admin/student.css";
//import "./styles/responsive.css";
//import "./styles/style.css";
import "./styles/dashboard/admin/hod.css";
import "./styles/dashboard/admin/department.css";
import "./styles/dashboard/admin/course.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 1000000,
          }}
          toastOptions={{
            duration: 3000,
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);