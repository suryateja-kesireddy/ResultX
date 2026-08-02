import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

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
import "./styles/dashboard.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./premium/styles/premium.css";
import "./premium/styles/topbar.css";
import "./premium/styles/account.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);