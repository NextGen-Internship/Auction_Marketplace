﻿using System.Security.Claims;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Services.Abstract;

namespace Auction_Marketplace.Services.Interface
{
	public interface ITokenService : IService
	{
        string GenerateJwtToken(User user);

        void GenerateUserRoles(User user, List<Claim> claims);

    }
}

