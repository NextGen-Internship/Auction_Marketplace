import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../../components/Navbar/Navbar.tsx';
import ApiService from '../../Services/ApiService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import AuctionService from '../../Services/AuctionService';

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);

const HeartPage: React.FC = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [biddedItems, setBiddedItems] = useState<any[]>([]);

  useEffect(() => {
    const saveTokenOnUnload = () => {
      const token = getToken();
      if (token) {
        localStorage.setItem('token', token);
      }
    };
    window.addEventListener('beforeunload', saveTokenOnUnload);
    return () => {
      window.removeEventListener('beforeunload', saveTokenOnUnload);
    };
  }, []);

  useEffect(() => {
    const persistedToken = localStorage.getItem('token');
    if (persistedToken) {
      sessionStorage.setItem('token', persistedToken);
      navigate('/heart');
    }
  }, []);

  useEffect(() => {
    if (isTokenExpired()) {
      clearToken();
    }
  }, []);

  useEffect(() => {
    const fetchBiddedItems = async () => {
      if (!token) return;

      const storedItems = JSON.parse(localStorage.getItem('biddedItems') || '[]');
      const validBiddedItems = await Promise.all(storedItems.map(async (item: any) => {
        try {
          const auctionDetailsResponse: ApiResponseDTO = await auctionService.getAuctionById(Number(item.auctionId));
          const auctionDetails = auctionDetailsResponse.data;
          return {
            ...item,
            name: auctionDetails.name,
            photo: auctionDetails.photo
          };
        } catch (error) {
          console.log(`Auction ${item.auctionId} does not exist. Removing from bidded items.`);
          return null;
        }
      }));

      setBiddedItems(validBiddedItems.filter((item: any) => item !== null));
    };

    fetchBiddedItems();
  }, [token, navigate]);

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

  const handleRedirectToAuction = (auctionId: number) => {
    navigate(`/auctions/details/${auctionId}`);
  };

  return (
    <div>
      <Navbar showAuthButtons={false} />
      <div>
        <h1>Bidded Items</h1>
        <ul>
          {biddedItems.map((item: any, index: number) => (
            <li key={index}>
              <img src={item.photo} alt="Auction" width="100" />
              <div>
                <p>Auction Name: {item.name}</p>
                <button onClick={() => handleRedirectToAuction(item.auctionId)}>View Auction</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeartPage;
