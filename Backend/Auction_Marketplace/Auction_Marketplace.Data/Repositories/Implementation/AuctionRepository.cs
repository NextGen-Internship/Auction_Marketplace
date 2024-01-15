using System.Linq.Expressions;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Interfaces;

namespace Auction_Marketplace.Data.Repositories.Implementations
{
    public class AuctionRepository : BaseRepository<Auction>, IAuctionRepository
    {
        public AuctionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}