import { NavLink } from "react-router-dom";

function ExamCellSidebar() {
  return (
    <aside className="examcell-sidebar">

      <div className="examcell-sidebar-logo">
        <h2>ResultX</h2>
        <p>Exam Cell Portal</p>
      </div>

      <nav className="examcell-sidebar-menu">

        <NavLink to="/examcell/dashboard" end>
          <span>🏠</span>
          Dashboard
        </NavLink>

        <NavLink to="/examcell/exams">
          <span>📝</span>
          Exams
        </NavLink>

        <NavLink to="/examcell/results">
          <span>📄</span>
          Results
        </NavLink>

        <NavLink to="/examcell/subjects">
          <span>📚</span>
          Subjects
        </NavLink>

        <NavLink to="/examcell/schedule">
          <span>📅</span>
          Schedule
        </NavLink>

        <NavLink to="/examcell/analytics">
          <span>📊</span>
          Analytics
        </NavLink>

        <NavLink to="/examcell/notifications">
          <span>🔔</span>
          Notifications
        </NavLink>

        <NavLink to="/examcell/profile">
          <span>👤</span>
          Profile
        </NavLink>

        <NavLink to="/examcell/settings">
          <span>⚙️</span>
          Settings
        </NavLink>

      </nav>

    </aside>
  );
}

export default ExamCellSidebar;