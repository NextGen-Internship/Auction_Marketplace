using System;
using Auction_Marketplace_Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auction_Marketplace_Data.Configuration
{
	public class RoleConfig : IEntityTypeConfiguration<Role>
	{
        public void Configure(EntityTypeBuilder<Role> builder)
		{
			builder.ToTable("Roles");
		}
	}
}

