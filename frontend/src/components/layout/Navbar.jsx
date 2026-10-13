import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import Button from "../common/Button";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Brand / Logo Area */}
        <a href="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-name">ResQPlate</span>
        </a>

        {/* Navigation Links */}
        <nav
          className={`navbar-menu ${menuOpen ? "active" : ""}`}
          aria-label="Main navigation"
        >
          <a href="/" onClick={closeMenu}>
            Home
          </a>

          <a href="/food" onClick={closeMenu}>
            Find Food
          </a>

          <a href="/how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <a href="/about" onClick={closeMenu}>
            About
          </a>

          <a href="/contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        {/* Authentication Actions */}
        <div className="navbar-actions">
          <a href="/login" className="login-link">
            <FaUserCircle />
            <span>Login</span>
          </a>

          <a href="/register" className="register-button">
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Button>

      </div>
    </header>
  );
}

export default Navbar;