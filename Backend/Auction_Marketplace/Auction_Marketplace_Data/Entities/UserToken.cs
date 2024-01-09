using System;
using Auction_Marketplace_Data.Entities.Abstract;
using Microsoft.AspNetCore.Identity;

namespace Auction_Marketplace_Data.Entities
{
	public class UserToken : IdentityUserToken<int>, IBaseEntity
	{
        // Implementing IBaseEntity interface
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

