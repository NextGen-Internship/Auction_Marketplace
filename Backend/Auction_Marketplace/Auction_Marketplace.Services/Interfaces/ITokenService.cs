using System.Security.Claims;
using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Services.Interfaces
{
    public interface ITokenService
	{
        string GenerateJwtToken(User user);

        void GenerateUserRoles(User user, List<Claim> claims);

    }
}

