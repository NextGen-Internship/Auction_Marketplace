import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../components/Navbar/Navbar.tsx';

const HomePage: React.FC = () => {
  const token = getToken();
  if (!token) {
    return (
      <div className='token-exp-container'>
        <div className='token-exp-content'>
          <p>Please log in to access this page.</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar showAuthButtons={false} />
      <div className="header-menu">
        <h1>Welcome to the Blankfactor Auction/Donation Marketplace</h1>
        <p>Buy or donate items for a good cause!</p>

        <div className="home-information">
          <h2>Featured Items</h2>
          <ul>
            <li>
              <Link to="/item/1">Featured Item 1</Link>
            </li>
            <li>
              <Link to="/item/2">Featured Item 2</Link>
            </li>
          </ul>
        </div>

        <div className="donation-opportunities" />
        <h2>Donation Opportunities</h2>
        <ul>
          <li>
            <Link to="/donation/1">Donation Opportunity 1</Link>
          </li>
          <li>
            <Link to="/donation/2">Donation Opportunity 2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
