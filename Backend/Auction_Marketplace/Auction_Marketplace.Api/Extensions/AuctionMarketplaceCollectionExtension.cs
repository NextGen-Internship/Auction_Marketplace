using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Implementations;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Implementation;
using Auction_Marketplace.Services.Interfaces;

namespace Microsoft.Extensions.DependencyInjection
{
	public static class AuctionMarketplaceCollectionExtension
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationUserService, AuthenticationUserService>();
            services.AddScoped(typeof(ITokenService), typeof(TokenService));
            services.AddScoped(typeof(IEmailService), typeof(EmailService));
            services.AddScoped(typeof(IRepository<User>), typeof(BaseRepository<User>));

            return services;
        }

    }
}

