using System;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Auction;
using Auction_Marketplace.Services.Abstract;

namespace Auction_Marketplace.Services.Interface
{
	public interface IAuctionsService : IService
	{
        Task<List<Auction>> GetAllAuctions();

        Task<Auction> GetAuctionById(int auctionId);

        Task DeleteAuction(int auctionId);

        Task<Response<string>> CreateAuction(AuctionViewModel auction);
    }
}

