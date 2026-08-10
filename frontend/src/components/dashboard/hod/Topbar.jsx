import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";

function HodTopbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/hod/login");
  };

  return (
    <header className="hod-topbar">

      <input
        type="text"
        placeholder="Search..."
        className="hod-search"
      />

      <div className="hod-topbar-right">

        

        <button
          className="hod-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default HodTopbar;