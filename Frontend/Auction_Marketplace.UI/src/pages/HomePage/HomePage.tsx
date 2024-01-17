import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/NavbarUser';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
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
