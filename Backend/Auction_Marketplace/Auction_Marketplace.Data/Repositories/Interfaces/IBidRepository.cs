using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Data.Repositories.Interfaces
{
	public interface IBidRepository : IRepository<Bid>
	{
        public Task<Auction?> FindAuctionById(int auctionId);

        public Task<List<Bid>> GetBidsByAuctionId(int auctionId);
    }
}