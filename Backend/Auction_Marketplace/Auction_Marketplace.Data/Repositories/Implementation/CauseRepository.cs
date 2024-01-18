using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Interfaces;

namespace Auction_Marketplace.Data.Repositories.Implementations
{
    public class CauseRepository : BaseRepository<Cause>, ICauseRepository
    {
        public CauseRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}