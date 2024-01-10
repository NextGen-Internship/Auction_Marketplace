using System;
using Auction_Marketplace.Services.Implementation.Authentication;
using Auction_Marketplace.Services.Implementation.Email;
using Auction_Marketplace.Services.Interface.Authentication;
using Auction_Marketplace.Services.Interface.Email;

namespace Microsoft.Extensions.DependencyInjection
{
	public static class AuctionMarketplaceCollectionExtension
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationUserService, AuthenticationUserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IEmailService, EmailService>();

            return services;
        }

    }
}

