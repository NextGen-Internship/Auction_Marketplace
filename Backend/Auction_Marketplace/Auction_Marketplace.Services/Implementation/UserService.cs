using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.User;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Services.Implementation
{
    public class UserService : IUserService
	{
        private readonly IUserRepository _userRepository;
        private readonly ApplicationDbContext _dbContext;

        public UserService(IUserRepository userRepository, ApplicationDbContext dbContext)
        {
            _userRepository = userRepository;
            _dbContext = dbContext;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<Response<UserViewModel>> GetUserByViewModel(string email)
        {
            try
            {
                var userEmail = await _userRepository.Find(u => u.Email == email).FirstOrDefaultAsync();

                UserViewModel user = new UserViewModel()
                {
                    FirstName = userEmail.FirstName,
                    LastName = userEmail.LastName,
                    Email = userEmail.Email,
                    ProfilePicture = userEmail.ProfilePicture
                };

                return new Response<UserViewModel>
                {
                    Succeed = true,
                    Data = user
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
        }

        public async Task<Response<string>> UpdateUserInfo(string email, UserViewModel updatedUser)
        {
            try
            {
                var existingUser = await _userRepository.GetUserByViewModel(email);

                existingUser.FirstName = updatedUser.FirstName;
                existingUser.LastName = updatedUser.LastName;
                existingUser.ProfilePicture = updatedUser.ProfilePicture;

                await _userRepository.UpdateUserInfo(existingUser);

                return new Response<string>
                {
                    Succeed = true,
                    Data = updatedUser.ToString()
                };
            }
            catch (Exception ex)
            {
                return new Response<string>
                {
                    Succeed = false,
                    Message = $"{ex.Message}"
                };
            }
        }

        public async Task<Response<List<User>>> GetAllUsers()
        {
            try
            {
                List<User> users = await _dbContext.Users.ToListAsync();
                return new Response<List<User>>
                {
                    Succeed = true,
                    Data = users
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting all users: {ex.Message}");
                throw;
            }
        }

        public async Task<User> GetUserById(int userId)
        {
            try
            {
                User? user = await _userRepository.Find(u => u.Id == userId).FirstOrDefaultAsync();
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
        }
    }
}

