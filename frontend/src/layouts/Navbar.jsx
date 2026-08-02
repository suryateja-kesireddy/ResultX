import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          ResultX
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Right Side */}
        {/* Right Side */}
<div className="nav-actions">
  <Link to="/login" className="login-btn">
    Login →
  </Link>
</div>

      </div>
    </nav>
  );
}

export default Navbar;