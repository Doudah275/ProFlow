import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./style/Navbar.css";

const Navbar = () => {
  // REVIEW: Navigation visibility is derived from client state only; treat it
  // as presentation, never as an authorization control. Add keyboard/focus
  // coverage for the mobile menu and logout flow.
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile navigation menu.
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Log out the current user and redirect to the login page.
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  // Apply a different style to the active navigation link.
  const getNavLinkClass = ({ isActive }) =>
    `navbar-link ${isActive ? "active" : ""}`;

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Brand */}
        <NavLink
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <span className="navbar-logo">P</span>

          <span className="navbar-brand-name">
            Pro<span>Flow</span>
          </span>
        </NavLink>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`navbar-menu-toggle ${
            isMenuOpen ? "is-open" : ""
          }`}
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav
          className={`navbar-navigation ${
            isMenuOpen ? "is-open" : ""
          }`}
        >
          <div className="navbar-links">

            {authState.isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/clients"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  Clients
                </NavLink>

                <NavLink
                  to="/projects"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  Projects
                </NavLink>

                <NavLink
                  to="/tasks"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  Tasks
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="navbar-register"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Authenticated user area */}
          {authState.isAuthenticated && (
            <div className="navbar-user-area">

              <div className="navbar-user">
                <div className="navbar-avatar">
                  {authState.user?.name
                    ?.charAt(0)
                    .toUpperCase() || "U"}
                </div>

                <div className="navbar-user-info">
                  <span className="navbar-user-name">
                    {authState.user?.name || "User"}
                  </span>

                  <span className="navbar-user-role">
                    {authState.user?.role || "User"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;