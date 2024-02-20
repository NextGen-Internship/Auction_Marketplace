using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models.Payment;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments(UserPaymentsViewModel model)
        {
            var payments = await _paymentService.GetPaymentsAsync(model);
            return Ok(payments);
        }
    }
}

