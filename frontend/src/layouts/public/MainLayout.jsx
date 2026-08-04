import { Outlet } from "react-router-dom";

import Navbar from "../public/Navbar";
import Footer from "../public/Footer";

function MainLayout() {
  return (
    <div className="layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;