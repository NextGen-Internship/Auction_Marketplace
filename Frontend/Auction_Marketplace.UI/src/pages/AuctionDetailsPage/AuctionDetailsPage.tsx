import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams, Link} from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil';
import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';
import BidService from '../../Services/BidService'; 
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import './AuctionDetailsPage.css';

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);
const bidService = new BidService(apiService); 

const AuctionDetailsPage: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionDetails, setAuctionDetails] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const token = getToken();

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response: ApiResponseDTO = await auctionService.getAuctionById(Number(auctionId));
        const fetchedAuctionDetails = response.data;
        setAuctionDetails(fetchedAuctionDetails);
      } catch (error) {
        console.error('Error fetching auction details:', error);
      }
    };

    if (token) {
      fetchAuctionDetails();
    }
    if (isTokenExpired()) {
      clearToken();
    }
  }, [auctionId, token]);

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

  if (!auctionDetails) {
    return <div>Loading...</div>;
  }

  const handleBidNowClick = async () => {
    try {
      const response: ApiResponseDTO = await bidService.placeBid(Number(bidAmount), Number(auctionId)); 
      if (response.succeed) {
        console.log('Cbid created successfully:', response.data);
      } else {
        console.error('Failed to create bid:', response.message);
      }
    } catch (error) {
      console.error('Error creating bid', error);
      alert(`Error creating cbid: `);
    }
  };

  return (
    <>
    <Navbar showAuthButtons={false} />
    <div className="auction-details-container">
         <Link to={`/auctions`} className="back-auctions-button">
            Back to Auctions
        </Link>
    <h3>{auctionDetails.name}</h3>
    <img src={auctionDetails.photo} alt={auctionDetails.name} />
    <p>{auctionDetails.description}</p>
    <p>Start Price: ${auctionDetails.startPrice}</p>
   <div>
        <label htmlFor="bidAmount">Your Bid: </label>
        <input
          type="number"
          id="bidAmount"
          value={bidAmount}
           onChange={(e) => setBidAmount(Number(e.target.value))} 
        />
      </div>
      <button className="bid-button" onClick={handleBidNowClick}>
        Bid Now <span role="img" aria-label="Money Bag">💰</span>
      </button>
  </div>
  </>
  );
};

export default AuctionDetailsPage;
