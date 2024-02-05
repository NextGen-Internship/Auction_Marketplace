import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import ApiService from '../../Services/ApiService';
import AuctionService from '../../Services/AuctionService';
import BidService from '../../Services/BidService'; 
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import BidDTO from '../../Interfaces/DTOs/BidDTO';
import './AuctionDetailsPage.css';

const apiService = new ApiService();
const auctionService = new AuctionService(apiService);
const bidService = new BidService(apiService); 

const AuctionDetailsPage: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionDetails, setAuctionDetails] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<number>();

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

    fetchAuctionDetails();
  }, [auctionId]);

  if (!auctionDetails) {
    return <div>Loading...</div>;
  }

  const handleBidNowClick = async () => {
    //sth will happen
  };

  return (
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
  );
};

export default AuctionDetailsPage;
