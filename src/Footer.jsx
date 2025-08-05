import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Grocery App. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/terms">Terms and Conditions</Link> 
      </div>
    </footer>
  );
}

export default Footer;
