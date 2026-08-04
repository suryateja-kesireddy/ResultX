import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";

function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    localStorage.removeItem("rememberedUser");

    navigate("/", { replace: true });
  };

  return (
    <header className="topbar">

      <input
        type="text"
        placeholder="Search..."
        className="search-box"
      />

      
        <button
          className="topbar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      

    </header>
  );
}

export default Topbar;