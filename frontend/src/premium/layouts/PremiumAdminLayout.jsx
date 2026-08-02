import { Outlet } from "react-router-dom";

import PremiumSidebar from "../components/layout/PremiumSidebar";
import PremiumTopbar from "../components/layout/PremiumTopbar";

const PremiumAdminLayout = () => {
  return (
    <div className="premium-layout">

      <PremiumSidebar />

      <main className="premium-main">

        <PremiumTopbar />

        <div className="premium-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default PremiumAdminLayout;