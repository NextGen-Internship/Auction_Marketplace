
using System;
using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Auction;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Services.Implementation
{
    public class AuctionsService : IAuctionsService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IAuctionRepository _auctionRepository;

        public AuctionsService(ApplicationDbContext dbContext, IAuctionRepository auctionRepository)
        {
            _dbContext = dbContext;
            _auctionRepository = auctionRepository;
        }

        public async Task<Response<Auction>> CreateAuction(AuctionViewModel auction)
        {
            try
            {
                var userExists = await _auctionRepository.Find(u => u.UserId == auction.UserId).FirstOrDefaultAsync();

                if (userExists == null)
                {
                    return new Response<Auction>
                    {
                        Succeed = false,
                        Message = $"User with UserId '{auction.UserId}' does not exist."
                    };
                }

                if (auction == null)
                {
                    return new Response<Auction>
                    {
                        Succeed = false,
                        Message = "Invalid auction data. UserId is missing."
                    };
                }

                Auction newAuction = new Auction
                {
                    UserId = auction.UserId,
                    Name = auction.Name,
                    Description = auction.Description,
                };

                if (newAuction == null || string.IsNullOrEmpty(newAuction.Name) || newAuction.UserId <= 0)
                {
                    return new Response<Auction>
                    {
                        Succeed = false,
                        Message = "Invalid auction data."
                    };
                }

                await _auctionRepository.AddAuction(newAuction);

                return new Response<Auction>
                {
                    Succeed = true,
                    Data = newAuction
                };
            }
            catch (Exception ex)
            {
                return new Response<Auction>
                {
                    Succeed = false,
                    Message = "An error occurred while creating the auction. See logs for details."
                };
            }
        }

        public async Task<Response<string>> DeleteAuction(int auctionId)
        {
            try
            {
                Auction auction = await _auctionRepository.FindAuctionById(auctionId);

                if(auction != null)
                {
                    await _auctionRepository.DeleteAuction(auctionId);
                }

                return new Response<string>
                {
                    Succeed = true,
                    Message = $"Successfully deleted auction with Id: {auctionId}"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                throw;
            }
        }

        public async Task<Response<List<Auction>>> GetAllAuctions()
        {
            try
            {
                List<Auction> auctions = await _dbContext.Auctions.ToListAsync();
                return new Response<List<Auction>>
                {
                    Succeed = true,
                    Data = auctions
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting all auctions: {ex.Message}");
                throw;
            }
        }

        public async Task<Response<Auction>> GetAuctionById(int auctionId)
        {
            try
            {
                Auction auction = await _auctionRepository.FindAuctionById(auctionId);
                return new Response<Auction>
                {
                    Succeed = true,
                    Data = auction
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting all auctions: {ex.Message}");
                throw;
            }
        }

        public async Task<Response<string>> UpdateAuction(int auctionId, AuctionViewModel updatedAuction)
        {
            try
            {
                var existingAuction = await _auctionRepository.FindAuctionById(auctionId);

                if (existingAuction == null)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Message = $"Auction with ID {auctionId} not found."
                    };
                }

                existingAuction.Name = updatedAuction.Name;
                existingAuction.Description = updatedAuction.Description;
                existingAuction.IsCompleted = updatedAuction.IsCompleted;

                await _auctionRepository.UpdateAuction(existingAuction);

                return new Response<string>
                {
                    Succeed = true
                };
            }
            catch (Exception ex)
            {
                return new Response<string>
                {
                    Succeed = false,
                    Message = $"An error occurred while updating the auction. See logs for details: {ex.Message}"
                };
            }
        }
    }
}

