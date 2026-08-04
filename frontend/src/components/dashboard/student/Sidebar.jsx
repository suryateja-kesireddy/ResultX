import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">

  <div className="sidebar-logo">
  ResultX
</div>

</div>

     <nav className="sidebar-menu">

  <NavLink to="/dashboard" end>
    <span>🏠</span>
    Dashboard
  </NavLink>

  <NavLink to="/dashboard/results">
    <span>📄</span>
    Results
  </NavLink>

  <NavLink to="/dashboard/profile">
    <span>👤</span>
    Profile
  </NavLink>

  <NavLink to="/dashboard/notifications">
    <span>🔔</span>
    Notifications
  </NavLink>

  <NavLink to="/dashboard/settings">
    <span>⚙️</span>
    Settings
  </NavLink>

</nav>
    </aside>
  );
}

export default Sidebar;