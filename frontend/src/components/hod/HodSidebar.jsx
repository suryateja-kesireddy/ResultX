import { NavLink } from "react-router-dom";

function HodSidebar() {
  return (
    <aside className="hod-sidebar">

      <div className="hod-sidebar-logo">
        <h2>ResultX</h2>
        <p>HOD Portal</p>
      </div>

      <nav className="hod-sidebar-menu">

        <NavLink to="/hod/dashboard" end>
          <span>🏠</span>
          Dashboard
        </NavLink>

        <NavLink to="/hod/students">
          <span>🎓</span>
          Students
        </NavLink>

        <NavLink to="/hod/faculty">
          <span>👨‍🏫</span>
          Faculty
        </NavLink>

        <NavLink to="/hod/subjects">
          <span>📚</span>
          Subjects
        </NavLink>

        <NavLink to="/hod/results">
          <span>📄</span>
          Results
        </NavLink>

        <NavLink to="/hod/analytics">
          <span>📊</span>
          Analytics
        </NavLink>

        <NavLink to="/hod/notifications">
          <span>🔔</span>
          Notifications
        </NavLink>

        <NavLink to="/hod/profile">
          <span>👤</span>
          Profile
        </NavLink>

        <NavLink to="/hod/settings">
          <span>⚙️</span>
          Settings
        </NavLink>

      </nav>

    </aside>
  );
}

export default HodSidebar;