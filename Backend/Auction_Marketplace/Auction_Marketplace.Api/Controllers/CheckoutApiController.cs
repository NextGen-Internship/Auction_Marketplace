using Auction_Marketplace.Services.Implementation;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutApiController : ControllerBase
    {
        private readonly StripeService _stripeService;

        public CheckoutApiController(StripeService stripeService)
        {
            _stripeService = stripeService;
        }

        [HttpPost]
        public IActionResult CreateCheckoutSession()
        {
            var session = _stripeService.CreateCheckoutSession();

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }
    }
}

