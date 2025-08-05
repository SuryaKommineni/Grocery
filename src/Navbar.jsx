import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Grocery Store</Link>
      </div>
      <div className="navbar-links">
        <Link to="/fruits">Fruits</Link>
        <Link to="/vegetables">Vegetables</Link>
        <Link to="/dairy">Dairy</Link>
        <Link to="/cart">Cart ({Object.keys(cart).length})</Link>
      </div>
    </nav>
  );
}

export default Navbar;
