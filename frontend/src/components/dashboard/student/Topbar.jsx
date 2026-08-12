import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/auth/useAuth";

function Topbar({
    sidebarOpen,
    onMenuClick,
}) {

    const { logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        localStorage.removeItem("rememberedUser");

        navigate("/", {
            replace: true,
        });
    };


    return (
        <header className="topbar">

            {/* Mobile Menu Button */}
            <button
                type="button"
                className="dashboard-menu-btn"
                onClick={onMenuClick}
                aria-label={
                    sidebarOpen
                        ? "Close sidebar"
                        : "Open sidebar"
                }
            >
                {sidebarOpen ? (
                    <X size={28} />
                ) : (
                    <Menu size={28} />
                )}
            </button>


            {/* Search */}
            <input
                type="text"
                placeholder="Search..."
                className="search-box"
            />


            {/* Logout */}
            <button
                type="button"
                className="topbar-logout"
                onClick={handleLogout}
            >
                Logout
            </button>

        </header>
    );
}

export default Topbar;