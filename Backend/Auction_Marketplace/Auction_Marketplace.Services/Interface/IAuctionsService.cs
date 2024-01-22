using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Auction;

namespace Auction_Marketplace.Services.Interface
{
	public interface IAuctionsService : IService
	{
        Task<List<Auction>> GetAllAuctions();

        Task<Auction> GetAuctionById(int auctionId);

        Task<Auction> DeleteAuction(int auctionId);

        Task<Response<string>> CreateAuction(AuctionViewModel auction);

        Task<Response<string>> UpdateAuction(int auctionId, AuctionViewModel updatedAuction);
    }
}

