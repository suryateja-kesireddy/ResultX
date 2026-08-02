import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="dashboard-card quick-actions-card">
      <div className="card-header">
        <h2>⚡ Quick Actions</h2>
      </div>

      <div className="actions-grid">
        <button
          className="dashboard-btn action-btn"
          onClick={() => navigate("/dashboard/results")}
          disabled
        >
          📄
          <span>View Results</span>
        </button>

        <button
          className="dashboard-btn action-btn"
          disabled
        >
          ⬇️
          <span>Download Memo</span>
        </button>

        <button
          className="dashboard-btn action-btn"
          disabled
        >
          👤
          <span>My Profile</span>
        </button>

        <button
          className="dashboard-btn action-btn"
          disabled
        >
          📅
          <span>Academic Calendar</span>
        </button>
      </div>
    </section>
  );
}

export default QuickActions;