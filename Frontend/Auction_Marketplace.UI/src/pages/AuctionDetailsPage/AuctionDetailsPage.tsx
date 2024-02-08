import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { useParams, Link } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken';
import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';
import BidService from '../../Services/BidService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import './AuctionDetailsPage.css';

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);
const bidService = new BidService(apiService);

const AuctionDetailsPage: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionDetails, setAuctionDetails] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<number>();
  const [bidSuccess, setBidSuccess] = useState<boolean>(false);
  const [winningBidInfo, setWinningBidInfo] = useState<string | null>(null);
  const [auctionEnded, setAuctionEnded] = useState<boolean>(false);
  const token = getToken();


  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response: ApiResponseDTO = await auctionService.getAuctionById(Number(auctionId));
        const fetchedAuctionDetails = response.data;
        setAuctionDetails(fetchedAuctionDetails);
        setAuctionEnded(fetchedAuctionDetails?.endTime === 0) 
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

 
  useEffect(() => {
    const checkEndTime = async () => {
      const currentTime = new Date();
      const endTime = new Date(auctionDetails.endTime);
      endTime.setHours(endTime.getHours() + 2);
      if (endTime <= currentTime) {
        try {
          const response: ApiResponseDTO = await auctionService.checkWinningBid(Number(auctionId));
          if (response.succeed) {
            setWinningBidInfo(response.data);
            setAuctionEnded(true);
          } else {
            console.error("Failed to check winning bid:", response.message);
          }
        } catch (error) {
          console.error("Error occurred while checking winning bid:", error);
        }
      }
    };

    checkEndTime();
  }, [auctionDetails, auctionId]);

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

  const now = new Date().getTime();
  const currentTime = new Date();
currentTime.setHours(currentTime.getHours() - 2);

const formattedTime = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
console.log("Adjusted time:", formattedTime);

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
        {auctionDetails?.endTime !== 0 && (
          <>
          <p>Time left: <CountdownTimer endTime={auctionDetails?.endTime} /></p>
            <div>
              { !auctionEnded && (
                <>
                  <label htmlFor="bidAmount">Your Bid: </label>
                  <input
                    type="number"
                    id="bidAmount"
                    value={bidAmount || ''}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    placeholder="$"
                  />
                </>
              )}
            </div>
            { !auctionEnded && (
              <button className="bid-button" onClick={handleBidNowClick}>
                Bid Now <span role="img" aria-label="Money Bag">💰</span>
              </button>
            )}
            {bidSuccess && (
              <div className="bid-success-note">
                Successfully placed bid!
              </div>
            )}
          </>
        )}
        {auctionEnded && winningBidInfo && (
          <div className="winning-bid-info">
            <p>{winningBidInfo}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionDetailsPage;
