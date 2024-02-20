using Auction_Marketplace.Data;
using Auction_Marketplace.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Auction_Marketplace.Services.Implementation
{
    public class AuctionCompletionService : BackgroundService
    {
        private readonly IServiceProvider _services;
        private readonly ILogger<AuctionCompletionService> _logger;

        public AuctionCompletionService(IServiceProvider services, ILogger<AuctionCompletionService> logger)
        {
            _services = services;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Checking auctions for completion at: {time}", DateTimeOffset.Now);

                using (var scope = _services.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                    var auctionsToComplete = await dbContext.Auctions
                        .Where(a => !a.IsCompleted)
                        .ToListAsync();

                    foreach (var auction in auctionsToComplete)
                    {
                        if (auction.EndDate < DateTime.Now)
                        {
                            //var mAuctionService = scope.ServiceProvider.GetRequiredService<IAuctionsService>();
                            //var emailResponse = await mAuctionService.SendEmailToWinner(auction.AuctionId);
                            //if (!emailResponse.Succeed)
                            //{
                            //    _logger.LogError($"Failed to send email to winner of auction {auction.AuctionId}: {emailResponse.Message}");
                            //    continue;
                            //}

                           // auction.IsCompleted = true;
                        }
                        
                    }

                    await dbContext.SaveChangesAsync();
                }

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); 
            }
        }
    }
}

