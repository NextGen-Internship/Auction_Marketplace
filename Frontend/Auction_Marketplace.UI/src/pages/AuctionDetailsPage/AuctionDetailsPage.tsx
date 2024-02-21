import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams, Link } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken';
import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';
import BidService from '../../Services/BidService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import './AuctionDetailsPage.css';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);
const bidService = new BidService(apiService);

const AuctionDetailsPage: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionDetails, setAuctionDetails] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<number>();
  const [bidSuccess, setBidSuccess] = useState<boolean>(false); 
  const [finalBid, setFinalBid] = useState<string | null>(null);
  const token = getToken();

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response: ApiResponseDTO = await auctionService.getAuctionById(Number(auctionId));
        const fetchedAuctionDetails = response.data;
        setAuctionDetails(fetchedAuctionDetails);

         const finalBidResponse: ApiResponseDTO = await auctionService.checkFinalBid(Number(auctionId));
        if (finalBidResponse.succeed) {
          setFinalBid(finalBidResponse.data);
        }
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

         const finalBidResponse: ApiResponseDTO = await auctionService.checkFinalBid(Number(auctionId));

        
        if (finalBidResponse.succeed) {
          setFinalBid(finalBidResponse.data);
        }
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
      <div className="auction-content">
        <div className="auction-photo">
          <img src={auctionDetails?.photo} />
        </div>
        <div className="auction-details">
          <div className="header-auction-detail">
            <h3 className='head-auction-name'>{auctionDetails?.name}</h3>
          </div>
          <p className="description">{auctionDetails?.description}</p>
          <p className="start-price">Start Price: {auctionDetails?.startPrice} BGN</p>
          <p>Time Left: <CountdownTimer endDate={new Date(auctionDetails?.endDate)} /> </p>
          {!auctionDetails || !auctionDetails.endDate || new Date(auctionDetails.endDate) > new Date() ? (
          <div className="bid-section">
            <label htmlFor="bidAmount">Your Bid: </label>
            <input className='input-bid'
              id="bidAmount"
              value={bidAmount || ''}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              placeholder=""
            />
            <button className="bid-button" onClick={handleBidNowClick}>
              Bid Now <span role="img" aria-label="Money Bag">💰</span>
            </button>

            <Link to={`/auctions`} className="back-auctions-button">
              Back to Auctions
            </Link>
            
          </div>
          ) : null}
          <div className='user-container'>
          {finalBid && (
          <p>{finalBid}</p>
        )}
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};


export default AuctionDetailsPage;