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
        [Route("create-session")]
        public IActionResult CreateCheckoutSession()
        {
            var session = _stripeService.CreateCheckoutSession();

            return Ok(new {clientSecret = session.ClientSecret});
        }

        [HttpPost]
        [Route("create-stripe-account")]
        public async Task<IActionResult> CreateStripeAccount(StripeFormViewModel model)
        {
            await _stripeService.CreateConnectedUser(model);

            return Ok();
        }


        [HttpPost]
        [Route("stripe-account")]
        public IActionResult CheckStripeAccount()
        {
            var hasConnectedAccount = _stripeService.CheckStripeAccount();

            return Ok(new { hasConnectedAccount });
        }

        [HttpPost]
        [Route("pay-out")]
        public async Task<IActionResult> PayOut()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeSignature = Request.Headers["Stripe-Signature"];

            await _stripeService.HandleWebhookEvent(json, stripeSignature);

            return Ok();
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

