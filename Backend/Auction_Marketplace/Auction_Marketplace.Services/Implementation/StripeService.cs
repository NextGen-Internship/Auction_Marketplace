using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;
using Stripe.Checkout;

namespace Auction_Marketplace.Services.Implementation
{
    public class StripeService : IStripeService
    {
        public Session CreateCheckoutSession(CauseViewModel cause)
        {
            var domain = "https://localhost:7141/"; 
            var options = new SessionCreateOptions()
            {
                Mode = "payment",
                SuccessUrl = domain + "Checkout/OrderConfirmation", 
                CancelUrl = domain + "Checkout/CancelPayment",  
                LineItems = new List<SessionLineItemOptions>()
                {
                    new SessionLineItemOptions()
                    {
                        Price = cause.Price.ToString(),
                        Quantity = 1
                    }
                },
                PaymentMethodTypes = new List<string>()
                {
                    "card"
                }
            };


            var service = new SessionService();
            Session session = service.Create(options);

            return session;
        }
    }
}

