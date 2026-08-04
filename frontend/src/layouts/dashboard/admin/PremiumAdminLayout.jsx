import { Outlet } from "react-router-dom";

import PremiumSidebar from "../../../pages/admin/PremiumSidebar";
import PremiumTopbar from "../../../pages/admin/PremiumTopbar";

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