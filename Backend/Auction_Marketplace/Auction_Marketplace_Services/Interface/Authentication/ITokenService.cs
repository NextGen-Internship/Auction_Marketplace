using System;
using System.Security.Claims;
using System.Security.Cryptography;
using Auction_Marketplace_Data.Entities;

namespace Auction_Marketplace_Services.Interface.Authentication
{
	public interface ITokenService
	{
        string GenerateJwtToken(User user);

        void GenerateUserRoles(User user, List<Claim> claims);

    }
}

