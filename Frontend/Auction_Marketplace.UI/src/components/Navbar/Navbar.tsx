import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logo from "../../assets/Marketplace.png";
import NavbarProps from '../../Interfaces/ComponentProps';

const Navbar: React.FC<NavbarProps> = ({ showAuthButtons = true }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear(); 
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/home" className="nav-item">
            Home
          </Link>
          <Link to="/marketplace" className="nav-item">
            Marketplace
          </Link>
          <Link to="/aboutUs" className="nav-item">
            About us
          </Link>
          <Link to="/policy" className="nav-item">
            Policy
          </Link>
          {showAuthButtons && (
            <>
              <Link to="/login" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </>
          )}
          {!showAuthButtons && (
            <Link to="/login" className="nav-item" onClick={handleLogout}>
              Log out
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
