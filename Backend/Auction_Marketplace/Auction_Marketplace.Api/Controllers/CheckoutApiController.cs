using Auction_Marketplace.Data.Models.Donation;
using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

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
        public async Task<IActionResult> CreateCheckoutSession(DonationAmountViewModel model)
        {
            var session = await _stripeService.CreateCheckoutSession(model);

            return new OkObjectResult(new { ReturnUrl = session.Url });
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
            var succeed = _stripeService.CheckStripeAccount();
            return Ok(new { succeed });
        }

        [HttpPost]
        [Route("pay-out")]
        public async Task<IActionResult> PayOut()
        {
            await _stripeService.PayOut();

            return Ok();
        }


        //[HttpPost]
        //[Route("webhook")]
        //public async Task<IActionResult> Webhook()
        //{
        //    var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        //    var stripeSignature = Request.Headers["Stripe-Signature"];

        //    await _stripeService.HandleWebhookEvent(json, stripeSignature);

        //    return Ok();
        //}
    }
}

