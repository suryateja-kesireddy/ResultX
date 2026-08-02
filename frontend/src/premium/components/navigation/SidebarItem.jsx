import { NavLink } from "react-router-dom";

const SidebarItem = ({
  icon: Icon,
  label,
  to,
}) => {
  return (
    <NavLink
      to={to}
      end={to === "/ui/admin"}   // Only Dashboard matches exactly
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