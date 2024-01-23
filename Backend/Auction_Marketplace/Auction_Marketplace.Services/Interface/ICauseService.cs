using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Cause;
using Auction_Marketplace.Services.Abstract;

namespace Auction_Marketplace.Services.Interface
{
	public interface ICauseService : IService
	{
        Task<Response<List<Cause>>> GetAllCauses();

        Task<Response<Cause>> GetCauseById(int causeId);

        Task<Response<string>> DeleteCause(int causeId);

        Task<Response<Cause>> CreateCause(CauseViewModel cause);

        Task<Response<string>> UpdateCause(int causeId, CauseViewModel cause);
    }
}

