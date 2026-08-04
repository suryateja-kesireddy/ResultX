import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";

const SidebarItem = ({
  icon: Icon,
  label,
  to,
}) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClick = (e) => {
    if (label === "Logout") {
      e.preventDefault();

      // Clear authentication
      auth.logout();

      // Redirect to Admin Login
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }
  };

  return (
    <NavLink
      to={to}
      end={to === "/ui/admin"}
      onClick={handleClick}
      className={({ isActive }) =>
        `rx-sidebar-item ${isActive ? "active" : ""}`
      }
    >
      <Icon size={20} className="rx-sidebar-icon" />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;