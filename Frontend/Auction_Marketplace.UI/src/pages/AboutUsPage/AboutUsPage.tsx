import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import '../HomePage/HomePage.css';
import './AboutUsPage.css';

const AboutUsPage: React.FC = () => {

  const token = getToken();

  useEffect(() => {
    if (isTokenExpired()) {
      clearToken();
    }
  }, []);

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
      <div className='about-us-content'>
        <h1>Welcome to Auction Marketplace!</h1>
        <h2>About us</h2>
        <p>
          Welcome to Auction Marketplace - your exclusive online marketplace where we combine exciting auctions with the opportunity to buy shares of unique items. We believe in providing incredible opportunities for our users by creating an interactive space where every step is an opportunity for discovery and participation.

          <h2>User Profile</h2>
          Create your personal Auction Marketplace profile to get full access to our platform. Your preferences and interests are important to us, and they will be taken into account to provide you with personalized experiences and offers.
        </p>
        <h2>Buying Shares with Items</h2>
        <p>
          Immerse yourself in a unique shopping experience by participating in our auctions. Our diverse catalog includes a variety of items from historical artifacts and art to exclusive collector's items. With every purchase, become part of the larger story of Auction Marketplace.
        </p>
        <h2>Causey page</h2>
        <p>
          We believe in the power of community and value socially responsible activity. Visit our causes page and discover projects and organizations you can donate to with every successful transaction. With your help, we support various public and charitable initiatives and create a better future for everyone.
        </p>
        <h2>Content and Information</h2>
        <p>
          Regularly follow our news page and blog for interesting stories, articles and interviews. We want to provide you with valuable information that will inspire and enrich your shopping experience at Auction Marketplace.
        </p>
        <p>
          Thank you for being part of our community! We are always here to offer you amazing experiences and opportunities. Auction with us and be part of a better future.
        </p>
        <p>
          With love,
          <p>
            The Auction Marketplace team
          </p>
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
