using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Auction;

namespace Auction_Marketplace.Services.Interface
{
	public interface IAuctionsService : IService
	{
        Task<Response<List<Auction>>> GetAllAuctions();

        Task<Response<Auction>> GetAuctionById(int auctionId);

        Task<Response<string>> DeleteAuction(int auctionId);

        Task<Response<Auction>> CreateAuction(AuctionViewModel auction);

        Task<Response<string>> UpdateAuction(int auctionId, AuctionViewModel updatedAuction);
    }
}

