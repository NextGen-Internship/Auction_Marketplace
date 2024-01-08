using System;
using Auction_Marketplace_Data.Entities.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auction_Marketplace_Data.Configuration
{
	public class BaseEntityConfig : IEntityTypeConfiguration<BaseEntity>
	{
		public void Configure(EntityTypeBuilder<BaseEntity> builder)
		{

		}
	}
}

