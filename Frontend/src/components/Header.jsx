import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Right Fit Matcher</span>
          </div>
          <nav className="nav">
            <a href="#search">Find Programs</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
