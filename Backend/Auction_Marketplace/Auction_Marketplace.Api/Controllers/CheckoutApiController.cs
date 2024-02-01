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
        [Route("create-session")]
        public IActionResult CreateCheckoutSession()
        {
            var session = _stripeService.CreateCheckoutSession();

            return Ok(new {clientSecret = session.ClientSecret});
        }


        [HttpPost]
        [Route("webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeSignature = Request.Headers["Stripe-Signature"];

            await _stripeService.HandleWebhookEvent(json, stripeSignature);

            return Ok();
        }
    }
}

