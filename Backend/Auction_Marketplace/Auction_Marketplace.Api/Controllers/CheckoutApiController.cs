using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutApiController : ControllerBase
    {
        private readonly IStripeService _stripeService;

        public CheckoutApiController(IStripeService stripeService)
        {
            _stripeService = stripeService;
        }

        [HttpPost]
        [Route("create-checkout-session")]
        public IActionResult CreateCheckoutSession(CauseViewModel model)
        {
            var session = _stripeService.CreateCheckoutSession(model);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }
    }
}

