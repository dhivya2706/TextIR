import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">✨ AI Image Lab</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/super-resolution">Super Resolution</Link>
        <Link to="/colourization">Colourization</Link>
        <Link to="/degrading">Degrading</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;