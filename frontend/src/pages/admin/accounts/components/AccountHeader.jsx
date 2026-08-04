import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountHeader() {
  const navigate = useNavigate();

  return (
    <div className="account-header">
      <div className="account-header-left">
        <h1>Account Management</h1>
        <p>
          Manage students, HODs, Exam Cell, and Admin accounts from one place.
        </p>
      </div>

      <button
        className="account-create-btn"
        onClick={() => navigate("/ui/admin/accounts/create")}
      >
        <Plus size={18} />
        <span>Create Account</span>
      </button>
    </div>
  );
}