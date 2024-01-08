using System;
using Auction_Marketplace_Data.Entities;
using Auction_Marketplace_Data.Entities.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auction_Marketplace_Data.Configuration
{
	public class AuctionConfig : IEntityTypeConfiguration<Auction>
    {
        public void Configure(EntityTypeBuilder<Auction> builder)
        {
           builder.ToTable("Auctions");
        }
    }
}

