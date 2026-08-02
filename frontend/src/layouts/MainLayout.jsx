import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

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