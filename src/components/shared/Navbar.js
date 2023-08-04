import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  return (
    <nav class="navbar">
      <ul class="nav-list">
        <li>
          <Link to="/" class="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/About" class="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
