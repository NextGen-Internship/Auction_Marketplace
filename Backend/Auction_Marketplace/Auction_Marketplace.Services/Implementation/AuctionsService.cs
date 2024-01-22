
using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Auction;
using Auction_Marketplace.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace Auction_Marketplace.Services.Implementation
{
    public class AuctionsService : IAuctionsService
    {
        private readonly ApplicationDbContext _dbContext;

        public AuctionsService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<string>> CreateAuction(AuctionViewModel newAuction)
        {
            try
            {
                var userExists = await _dbContext.Users.AnyAsync(u => u.Id == newAuction.UserId);

                if (!userExists)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Data = null,
                        Message = $"User with UserId '{newAuction.UserId}' does not exist."
                    };
                }


                if (newAuction == null)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Data = null,
                        Message = "Invalid auction data. UserId is missing or not valid."
                    };
                }

                var auction = new Auction
                {
                    UserId = newAuction.UserId,
                    Name = newAuction.Name,
                    Description = newAuction.Description,
                };

                if (auction == null || string.IsNullOrEmpty(auction.Name) || auction.UserId <= 0)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Message = "Invalid auction data."
                    };
                }

                _dbContext.Auctions.Add(auction);
                _dbContext.SaveChanges();

                return new Response<string>
                {
                    Succeed = true
                };
            }
            catch (Exception ex)
            {
                // Log the exception, including inner exception
                Console.WriteLine($"Error creating auction: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");

                // Return an error response
                return new Response<string>
                {
                    Succeed = false,
                    Message = "An error occurred while creating the auction. See logs for details."
                };
            }
        }

        public Task DeleteAuction(int auctionId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Auction>> GetAllAuctions()
        {
            throw new NotImplementedException();
        }

        public Task<Auction> GetAuctionById(int auctionId)
        {
            throw new NotImplementedException();
        }
    }
}

