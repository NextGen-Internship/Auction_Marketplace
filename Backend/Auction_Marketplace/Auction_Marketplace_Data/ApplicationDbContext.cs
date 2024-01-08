using Auction_Marketplace_Data.Configuration;
using Auction_Marketplace_Data.Entities;
using Auction_Marketplace_Data.Entities.Abstract;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Auction_Marketplace_Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        //public DbSet<BaseEntity> BaseEntities { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<Cause> Causes { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<UserPaymentMethod> UserPaymentMethods { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //base.OnModelCreating(builder);

            //builder.ApplyConfiguration(new BaseEntityConfig());
            builder.ApplyConfiguration(new AuctionConfig());
            builder.ApplyConfiguration(new BidConfig());
            builder.ApplyConfiguration(new CauseConfig());
            builder.ApplyConfiguration(new ItemConfig());
            builder.ApplyConfiguration(new PaymentConfig());
            builder.ApplyConfiguration(new ReviewConfig());
            builder.ApplyConfiguration(new UserPaymentMethodConfig());
        }

    }
}
