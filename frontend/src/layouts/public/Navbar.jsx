import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

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

                {/* ==================================================
                    LOGO
                ================================================== */}

                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >
                    ResultX
                </Link>


                {/* ==================================================
                    MOBILE MENU BUTTON
                ================================================== */}

                <button
                    type="button"
                    className="menu-btn"
                    onClick={() =>
                        setMenuOpen((prev) => !prev)
                    }
                    aria-label={
                        menuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>


                {/* ==================================================
                    NAVIGATION
                ================================================== */}

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


                    {/* ==================================================
                        MOBILE LOGIN
                    ================================================== */}

                    <div className="mobile-login">

                        <Link
                            to="/login"
                            className="login-btn"
                            onClick={closeMenu}
                        >
                            Login →
                        </Link>

                    </div>

                </div>


                {/* ==================================================
                    DESKTOP LOGIN
                ================================================== */}

                <div className="nav-actions">

                    <Link
                        to="/login"
                        className="login-btn"
                        onClick={closeMenu}
                    >
                        Login →
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;