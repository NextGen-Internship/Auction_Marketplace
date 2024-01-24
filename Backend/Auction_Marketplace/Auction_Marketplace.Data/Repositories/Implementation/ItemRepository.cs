using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Data.Repositories.Implementations
{
    public class ItemRepository : BaseRepository<Item>, IItemRepository
    {
        public ItemRepository(ApplicationDbContext context) : base(context)
        {
        }

    }
}