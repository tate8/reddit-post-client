import React from "react";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";

function toggleSidebar() {
  // Jquery and JS to toggle sidebar
  $(function () {
    document.querySelector("body").classList.toggle("active");
  });
}

// simple navbar on the user page to be able to get back to the home page
function Navbar() {
  return (
    <>
      <nav className="navbar justify-content-between">
        <Link to="/" className="navbar-brand">
          Reddit 2.0
        </Link>
        <div class="hamburger" onClick={toggleSidebar}>
          <a>
            <i class="fas fa-bars fa-2x"></i>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
