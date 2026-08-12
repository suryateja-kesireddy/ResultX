import { X } from "lucide-react";

import Logo from "../../pages/admin/Logo";
import SidebarMenu from "../../pages/admin/SidebarMenu";

const PremiumSidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`premium-sidebar ${
        isOpen ? "premium-sidebar-open" : ""
      }`}
    >

      {/* Sidebar Header */}
      <div className="premium-sidebar-header">

        

        {/* Mobile Close Button */}
        <button
          type="button"
          className="premium-sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

      </div>

      {/* Sidebar Navigation */}
      <div className="premium-sidebar-content">

        <div className="rx-sidebar-menu">
          <SidebarMenu />
        </div>

      </div>

    </aside>
  );
};

export default PremiumSidebar;