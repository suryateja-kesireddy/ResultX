import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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

        <div className="hod-user">

          <h4>{user?.name || "HOD"}</h4>

          <p>{user?.role}</p>

        </div>

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