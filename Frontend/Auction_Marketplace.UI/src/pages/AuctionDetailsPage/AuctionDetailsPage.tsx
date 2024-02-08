import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { useParams, Link } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken';
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
  const [bidAmount, setBidAmount] = useState<number>();
  const [bidSuccess, setBidSuccess] = useState<boolean>(false); 
  const token = getToken();

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response: ApiResponseDTO = await auctionService.getAuctionById(Number(auctionId));
        const fetchedAuctionDetails = response.data;
        setAuctionDetails(fetchedAuctionDetails);
      } catch (error) {
        throw error;
      }
    };

    if (token) {
      fetchAuctionDetails();
    }
    if (isTokenExpired()) {
      clearToken();
    }
  }, [auctionId, token]);

  const handleBidNowClick = async () => {
    try {
      const bidData = { auctionId: Number(auctionId), amount: Number(bidAmount) };
      const response: ApiResponseDTO = await bidService.placeBid(bidData);
      if (response.succeed) {
        setBidSuccess(true); 
        setBidAmount(undefined); 
      } else {
        throw response.message;
      }
    } catch (error) {
      alert(`Error creating bid: ${error}`);
    }
  };

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="auction-details-container">
        <Link to={`/auctions`} className="back-auctions-button">
          Back to Auctions
        </Link>
        <h3>{auctionDetails?.name}</h3>
        <img src={auctionDetails?.photo} alt={auctionDetails?.name} />
        <p>{auctionDetails?.description}</p>
        <p>Start Price: ${auctionDetails?.startPrice}</p>
        <div>
          <label htmlFor="bidAmount">Your Bid: </label>
          <input
            type="number"
            id="bidAmount"
            value={bidAmount || ''}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            placeholder="$"
          />
        </div>
        <button className="bid-button" onClick={handleBidNowClick}>
          Bid Now <span role="img" aria-label="Money Bag">💰</span>
        </button>
        {bidSuccess && (
          <div className="bid-success-note">
            Successfully placed bid!
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionDetailsPage;
