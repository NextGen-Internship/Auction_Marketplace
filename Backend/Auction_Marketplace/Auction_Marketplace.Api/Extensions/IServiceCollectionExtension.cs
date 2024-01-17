using System.Reflection;
using System.Text;
using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Implementations;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Abstract;
using Auction_Marketplace.Services.Implementation;
using Auction_Marketplace.Services.Interface;
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

            services.AddIdentity<User, Role>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            services.AddSqlServer<ApplicationDbContext>(connectionString);

            if (environment.IsDevelopment())
            {
                services.Configure<IdentityOptions>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                    options.SignIn.RequireConfirmedEmail = false;
                    options.Tokens.EmailConfirmationTokenProvider = "Default";
                });
            }


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
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(jwt =>
            {
                var key = Encoding.ASCII.GetBytes(configuration["JwtConfig:Secret"]!);

                jwt.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = configuration["JwtConfig:Issuer"],
                    ValidAudience = configuration["JwtConfig:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true
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
            services.AddScopedServiceTypes(typeof(AuthenticationService).Assembly, typeof(IService));

            services.AddScopedServiceTypes(typeof(BaseRepository).Assembly, typeof(IRepository));

            return services;
        }

    }
}