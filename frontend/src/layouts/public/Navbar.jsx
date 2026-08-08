import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import useAuth from "../../hooks/auth/useAuth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${
        isHome ? "navbar-home" : "navbar-light"
      }`}
    >
      <div className="container navbar-container">

        {/* Logo */}

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          ResultX
        </Link>

        {/* Mobile Menu */}

        {/*
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        */}

        {/* Navigation */}

        <div
          className={`nav-links ${
            menuOpen ? "open" : ""
          }`}
        >
          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          {/*
          <div className="mobile-login">
            <Link
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              Login →
            </Link>
          </div>
          */}
        </div>

        {/* Desktop Login */}

        <div className="nav-actions">
          <Link
            to="/login"
            className="login-btn"
          >
            Login →
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;