import React from 'react';
import { Link } from 'react-router-dom';
import AuctionDTO from '../../Interfaces/DTOs/AuctionDTO';

const AuctionList: React.FC<{ auctions: AuctionDTO[] }> = ({ auctions }) => {
  return (
    <div className="auction-list">
      {auctions.map((auction) => (
        <div key={auction.auctionId} className="auction-info">
          <h3>{auction.name}</h3>
          <Link to={`/details/${auction.auctionId}`} className="details-button-auctions">
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AuctionList;
