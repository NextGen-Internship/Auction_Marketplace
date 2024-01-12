using System;
using System.Reflection;
using System.Text;
using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Services.Implementation.Authentication;
using Auction_Marketplace.Services.Implementation.Email;
using Auction_Marketplace.Services.Interface.Authentication;
using Auction_Marketplace.Services.Interface.Email;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Microsoft.Extensions.DependencyInjection
{
	public static class IServiceCollectionExtention
    { 

        public static IServiceCollection RegisterDbContext(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment environment)
        {
            var connectionString = configuration.GetConnectionString("ConnectionString");

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.Tokens.EmailConfirmationTokenProvider = "Default";
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();


            //services.AddSqlServer<ApplicationDbContext>(connectionString);


            if (environment.IsProduction())
            {
                using var context = new ApplicationDbContext();
                context.Database.Migrate();

                services.Configure<IdentityOptions>(options =>
                {
                    options.SignIn.RequireConfirmedEmail = false;
                });
            }

            return services;
        }


        public static IServiceCollection RegisterAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            //.AddScoped<SignInManager<User>>();

            //services.AddScoped<IAuthenticationUserService, AuthenticationUserService>();

            //services.AddScoped<ITokenService, TokenService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtConfig:Secret"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            return services;
        }




        private static IServiceCollection AddScopedServiceTypes(this IServiceCollection services, Assembly assembly, Type fromType)
        {
            var serviceTypes = assembly.GetTypes()
                .Where(x => !string.IsNullOrEmpty(x.Namespace) && x.IsClass && !x.IsAbstract && fromType.IsAssignableFrom(x))
                .Select(x => new
                {
                    Interface = x.GetInterface($"I{x.Name}"),
                    Implementation = x
                });

            foreach (var serviceType in serviceTypes)
            {
                services.AddScoped(serviceType.Interface, serviceType.Implementation);
            }

            return services;
        }

        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            services.AddScopedServiceTypes(typeof(AuthenticationUserService).Assembly, typeof(IAuthenticationUserService));
            services.AddScopedServiceTypes(typeof(TokenService).Assembly, typeof(ITokenService));
            services.AddScopedServiceTypes(typeof(EmailService).Assembly, typeof(IEmailService));

            return services;
        }

    }
}

