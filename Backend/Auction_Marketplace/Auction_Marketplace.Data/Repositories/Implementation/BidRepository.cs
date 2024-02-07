using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Data.Repositories.Implementations
{
    public class BidRepository : BaseRepository<Bid>, IBidRepository
    {
        public BidRepository(ApplicationDbContext context) : base(context)
        {
           
        }
    }
}