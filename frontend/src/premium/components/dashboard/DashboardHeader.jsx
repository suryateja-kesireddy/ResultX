import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {

  const navigate = useNavigate();

  return (
    <div className="rx-dashboard-header">

      <div className="rx-dashboard-left">

        <span className="rx-dashboard-badge">
          👋 Welcome Back
        </span>

        <h1>
          Good Morning, Administrator
        </h1>

        <p>
          Manage students, faculty, results, departments and
          academic activities from one place.
        </p>

      </div>

      <div className="rx-dashboard-right">

        <button
          className="rx-primary-btn"
          onClick={() => navigate("/ui/admin/accounts/create")}
        >
          <Plus size={18} />
          <span>Create Account</span>
        </button>

      </div>

    </div>
  );
};

export default DashboardHeader;