using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;

namespace Auction_Marketplace.Services.Implementation
{
    public class UserService : IUserService
	{
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }
    }
}

