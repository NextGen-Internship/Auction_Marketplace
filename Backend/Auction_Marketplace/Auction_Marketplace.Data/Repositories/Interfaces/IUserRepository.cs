using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Data.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<User?> GetByEmailAsync(string email);
    }
}