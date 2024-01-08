
import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import logo from "../../assets/Marketplace.png"

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className='nav-links'>
            <Link to="/" className="nav-item">
                Home
            </Link>
            <Link to="/services" className="nav-item">
                Services
            </Link>
            <Link to="/login" className="nav-item">
                Login
            </Link>
            <Link to="/register" className="nav-item">
                Register
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
