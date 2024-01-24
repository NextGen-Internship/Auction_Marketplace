import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css";
import logo from "../../assets/Marketplace.png";
import NavbarProps from '../../Interfaces/ComponentProps';
import profilePicture from "../../assets/profilePicture.jpg";

const Navbar: React.FC<NavbarProps> = ({ showAuthButtons = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profilePic] = useState(profilePicture);

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  };

  const isLogOutPage = location.pathname === '/login';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-links-default">
          <Link to="/home" className="nav-item">
            Home
          </Link>
          <Link to="/auctions" className="nav-item">
            Auctions
          </Link>
          <Link to="/causes" className="nav-item">
            Causes
          </Link>
          <Link to="/policy" className="nav-item">
            Policy
          </Link>
        </div>
        {showAuthButtons && (
          <>
            <div className="nav-links-user">
              <Link to="/login" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </div>
          </>
        )}
        {!showAuthButtons && !isLogOutPage && (
          <div className="nav-links-user">
            <Link to="/profile">
              <div className="profile-picture-container">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
            </Link>
            <Link to="/login" className="nav-item" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
