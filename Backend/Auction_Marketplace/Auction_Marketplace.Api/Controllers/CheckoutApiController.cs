using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutApiController : ControllerBase
    {
        private readonly IStripeService _stripeService;
        private readonly IConfiguration _configuration;

        public CheckoutApiController(IStripeService stripeService,
                                    IConfiguration configuration)
        {
            _stripeService = stripeService;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("create-session")]
        public IActionResult CreateCheckoutSession()
        {
            var session = _stripeService.CreateCheckoutSession();

            return Ok(new {
                clientSecret = session.ClientSecret,
                publishableKey = _configuration.GetSection("Stripe:SecretKey").Get<string>()
            });
        }
    }
}

