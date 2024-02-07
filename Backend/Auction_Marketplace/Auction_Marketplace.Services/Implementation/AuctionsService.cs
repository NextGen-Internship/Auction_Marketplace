
using System;
using System.Security.Claims;
using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Auction;
using Auction_Marketplace.Data.Repositories.Implementations;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Constants;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Services.Implementation
{
    public class AuctionsService : IAuctionsService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IAuctionRepository _auctionRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IUserService _userService;
        private readonly IS3Service _s3Service;

        public AuctionsService(ApplicationDbContext dbContext,
            IAuctionRepository auctionRepository,
            IHttpContextAccessor contextAccessor,
            IUserService userService, IS3Service s3Service)
        {
            _dbContext = dbContext;
            _auctionRepository = auctionRepository;
            _contextAccessor = contextAccessor;
            _userService = userService;
            _s3Service = s3Service;
        }

        public async Task<Response<Auction>> CreateAuction(NewAuctionViewModel auction)
        {
            try
            {
                if(auction == null)
                {
                    return new Response<Auction>
                    {
                        Succeed = false,
                        Message = "Invalid auction data."
                    };
                }

                var email = _contextAccessor.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
                if (email == null)
                {
                    return new Response<Auction>
                    {
                        Succeed = false,
                        Message = "User is not existing."
                    };
                }

                var user = await _userService.GetByEmailAsync(email);

                Auction newAuction = new Auction
                {
                    UserId = user.Id,
                    Name = auction.Name,
                    Description = auction.Description,
                    StartPrice = auction.StartPrice,
                    ExistingDays = auction.ExistingDays,
                    IsCompleted = false,
                };

                if (auction.Photo != null)
                {
                    var fileName = String.Format(AWSConstants.UploadCausePictureName, auction.Name);
                    var path = String.Format(AWSConstants.UploadCausePicturePath, auction.Name);
                    newAuction.Photo = await _s3Service.UploadFileAsync(auction.Photo, path, fileName);
                }


                if (newAuction == null || string.IsNullOrEmpty(newAuction.Name) || newAuction.UserId <= 0)
                {
                    return new Response<Auction>
                    {
                        Succeed = false,
                        Message = "Invalid auction data."
                    };
                }

                await _auctionRepository.AddAsync(newAuction);
                await _auctionRepository.SaveChangesAsync();

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

