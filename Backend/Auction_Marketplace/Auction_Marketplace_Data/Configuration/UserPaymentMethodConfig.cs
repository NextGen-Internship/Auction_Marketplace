using System;
using Auction_Marketplace_Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auction_Marketplace_Data.Configuration
{
	public class UserPaymentMethodConfig : IEntityTypeConfiguration<UserPaymentMethod>
    {
        public void Configure(EntityTypeBuilder<UserPaymentMethod> builder)
        {

        }
    }
}

