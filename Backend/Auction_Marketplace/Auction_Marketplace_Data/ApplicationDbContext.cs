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
    public class ApplicationDbContext : IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
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

        /*public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChanges();
        }*/

        //override savechangesasync
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            AddTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries()
                .Where(x => x.Entity is IBaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entity in entities)
            {
                var now = DateTime.UtcNow; // current datetime

                if (entity.State == EntityState.Added)
                {
                    ((IBaseEntity)entity.Entity).CreatedAt = now;
                }
                ((IBaseEntity)entity.Entity).UpdatedAt = now;
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });

            //builder.ApplyConfiguration(new BaseEntityConfig());
            builder.ApplyConfiguration(new AuctionConfig());
            builder.ApplyConfiguration(new BidConfig());
            builder.ApplyConfiguration(new CauseConfig());
            builder.ApplyConfiguration(new ItemConfig());
            builder.ApplyConfiguration(new PaymentConfig());
            builder.ApplyConfiguration(new ReviewConfig());
            builder.ApplyConfiguration(new UserPaymentMethodConfig());
            builder.ApplyConfiguration(new UserConfig());
            builder.ApplyConfiguration(new RoleConfig());
            builder.ApplyConfiguration(new RoleClaimConfig());
            builder.ApplyConfiguration(new UserClaimConfig());
            builder.ApplyConfiguration(new UserLoginConfig());
            builder.ApplyConfiguration(new UserRoleConfig());
            builder.ApplyConfiguration(new UserTokenConfig());
        }

    }
}
