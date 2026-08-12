import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

function Sidebar({ isOpen, onClose }) {

    const handleNavigation = () => {
        // Close sidebar after selecting a menu item on mobile
        onClose?.();
    };

    return (
        <aside
            className={`sidebar ${
                isOpen ? "sidebar-open" : ""
            }`}
        >

            {/* Mobile Close Button */}
            <button
                type="button"
                className="sidebar-close-btn"
                onClick={onClose}
                aria-label="Close sidebar"
            >
                <X size={28} />
            </button>


            {/* Logo */}
            <div className="sidebar-header">

                <div className="sidebar-logo">
                    ResultX
                </div>

            </div>


            {/* Navigation */}
            <nav className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    end
                    onClick={handleNavigation}
                >
                    <span>🏠</span>
                    Dashboard
                </NavLink>


                <NavLink
                    to="/dashboard/results"
                    onClick={handleNavigation}
                >
                    <span>📄</span>
                    Results
                </NavLink>


                <NavLink
                    to="/dashboard/profile"
                    onClick={handleNavigation}
                >
                    <span>👤</span>
                    Profile
                </NavLink>


                <NavLink
                    to="/dashboard/notifications"
                    onClick={handleNavigation}
                >
                    <span>🔔</span>
                    Notifications
                </NavLink>


                <NavLink
                    to="/dashboard/settings"
                    onClick={handleNavigation}
                >
                    <span>⚙️</span>
                    Settings
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;