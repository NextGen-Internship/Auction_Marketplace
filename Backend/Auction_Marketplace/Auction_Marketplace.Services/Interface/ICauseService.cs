using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Cause;

namespace Auction_Marketplace.Services.Interface
{
	public interface ICauseService
	{
        Task<List<Cause>> GetAllCauses();

        Task<Cause> GetCauseById(int causeId);

        Task<Cause> DeleteCause(int causeId);

        Task<Response<string>> CreateCause(CauseViewModel cause);

        Task<Response<string>> UpdateCause(int causeId, CauseViewModel cause);
    }
}

