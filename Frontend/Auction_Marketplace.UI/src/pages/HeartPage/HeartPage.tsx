import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.tsx';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './HeartPage.css';

import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);

const HeartPage: React.FC = () => {
  const [biddedAuctions, setBiddedAuctions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const auctionsPerPage = 6;
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBiddedAuctions = async () => {
      try {
        const response = await auctionService.getAuctionsBidded();
        setBiddedAuctions(response.data);
      } catch (error) {
        console.error('Error fetching bidded auctions:', error);
      }
    };
    fetchBiddedAuctions();
  }, [currentPage]);

  useEffect(() => {
    const saveTokenOnUnload = () => {
      if (token) {
        localStorage.setItem('token', token);
      }
    };
    window.addEventListener('beforeunload', saveTokenOnUnload);
    return () => {
      window.removeEventListener('beforeunload', saveTokenOnUnload);
    };
  }, [token]);

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

  if (biddedAuctions.length === 0) {
    return (
      <div>
        <Navbar showAuthButtons={false} />
        <div className='title-container'>
          <p className='title'><span role="img" aria-label="heart">❤️</span> Favourite items </p>
        </div>
        <p>You don't have any bids.</p>
      </div>
    );
  }
  
  const indexOfLastAuction = currentPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = biddedAuctions.slice(indexOfFirstAuction, indexOfLastAuction);

  const renderMiniPages = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(biddedAuctions.length / auctionsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className='pagination'>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={number === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar showAuthButtons={false} />
      <div className='title-container'>
        <p className='title'><span role="img" aria-label="heart">❤️</span> Favourite items </p>
      </div>
      <div className='auctions-container'>
        {currentAuctions.map((auction) => (
          <div key={auction.id} className='auction-info'>
            <h3 className='auction-header'>{auction.name}</h3>
            <img src={auction.photo} alt={auction.name} className='auction-image' />
            <Link to={`/auctions/details/${auction.auctionId}`} className='details-button'>
              Details
            </Link>
          </div>
        ))}
      </div>
      {renderMiniPages()}
    </div>
  );
};

export default HeartPage;
