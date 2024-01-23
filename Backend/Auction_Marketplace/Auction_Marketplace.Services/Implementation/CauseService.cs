using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Cause;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Services.Implementation
{
	public class CauseService : ICauseService
	{
        private readonly ApplicationDbContext _dbContext;
        private readonly ICauseRepository _causeRepository;

        public CauseService(ApplicationDbContext dbContext, ICauseRepository causeRepository)
		{
            _dbContext = dbContext;
            _causeRepository = causeRepository;
		}

        public async Task<Response<string>> CreateCause(CauseViewModel cause)
        {
            try
            {
                var causeExsist = _causeRepository.Find(c => c.UserId == cause.UserId).FirstOrDefault();
                if (causeExsist == null)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Message = $"Cause with UserId '{cause.UserId}' does not exist."
                    };
                }

                if (cause == null)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Message = "Invalid cause data."
                    };
                }
                var newCause = new Cause
                {
                    UserId = cause.UserId,
                    Name = cause.Name,
                    Description = cause.Description,
                    AmountNeeded  = cause.AmountNeeded,
                    AmountCurrent = cause.AmountCurrent,
                    IsCompleted = cause.IsCompleted
                };

                if (newCause == null || string.IsNullOrEmpty(newCause.Name) || newCause.UserId <= 0)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Message = "Invalid auction data."
                    };
                }

                await _causeRepository.AddCause(newCause);

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
                    Message = "An error occurred while creating the cause. See logs for details."
                };
            }
        }

        public async Task<Cause> DeleteCause(int causeId)
        {
            try
            {
                Cause cause = await _causeRepository.FindCauseById(causeId);

                if (cause != null)
                {
                    await _causeRepository.DeleteCause(causeId);
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                throw;
            }
        }

        public async Task<List<Cause>> GetAllCauses()
        {
            try
            {
                List<Cause> causes = await _dbContext.Causes.ToListAsync();

                return causes;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting all causes: {ex.Message}");
                throw;
            }
        }

        public async Task<Cause> GetCauseById(int causeId)
        {
            try
            {
                Cause cause = await _causeRepository.FindCauseById(causeId);
                return cause;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting all causes: {ex.Message}");
                throw;
            }
        }

        public async Task<Response<string>> UpdateCause(int causeId, CauseViewModel updatedCause)
        {
            try
            {
                var existingCause = await _causeRepository.FindCauseById(causeId);

                if (existingCause == null)
                {
                    return new Response<string>
                    {
                        Succeed = false,
                        Message = $"Auction with ID {causeId} not found."
                    };
                }

                existingCause.Name = updatedCause.Name;
                existingCause.Description = updatedCause.Description;
                existingCause.IsCompleted = updatedCause.IsCompleted;
                existingCause.AmountNeeded = updatedCause.AmountNeeded;
                existingCause.AmountCurrent = updatedCause.AmountCurrent;

                await _causeRepository.UpdateCause(existingCause);

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
                    Message = $"An error occurred while updating the cause. See logs for details: {ex.Message}"
                };
            }
        }
    }
}

