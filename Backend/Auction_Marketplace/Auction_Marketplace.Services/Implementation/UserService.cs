using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.User;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Constants;
using Auction_Marketplace.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Services.Implementation
{
    public class UserService : IUserService
	{
        private readonly IUserRepository _userRepository;
        private readonly ApplicationDbContext _dbContext;
        private readonly IS3Service _s3Service;

        public UserService(IUserRepository userRepository, ApplicationDbContext dbContext, IS3Service s3Service)
        {
            _userRepository = userRepository;
            _dbContext = dbContext;
            _s3Service = s3Service;
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

        public async Task<Response<UpdateUserViewModel>> UpdateUserInfo(string email, UpdateUserViewModel updatedUser)
        {
            try
            {
                var existingUser = await _userRepository.GetByEmailAsync(email);
                if(existingUser is null)
                {
                    return new Response<UpdateUserViewModel>
                    {
                        Succeed = false,
                        Message = "No such user!"
                    };
                }

                existingUser.FirstName = updatedUser.FirstName ?? existingUser.FirstName;
                existingUser.LastName = updatedUser.LastName ?? existingUser.LastName;

                var fileName = String.Format(AWSConstants.UploadProfilePictureName, existingUser.Email);
                var path = String.Format(AWSConstants.UploadProfilePicturePath, existingUser.Email);

                existingUser.ProfilePicture = updatedUser.ProfilePicture is not null ? await _s3Service.UploadFileAsync(updatedUser.ProfilePicture, path, fileName) : existingUser.ProfilePicture;

                await _userRepository.UpdateUserInfo(existingUser);

                return new Response<UpdateUserViewModel>
                {
                    Succeed = true,
                    Data = updatedUser
                };
            }
            catch (Exception ex)
            {
                return new Response<UpdateUserViewModel>
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

