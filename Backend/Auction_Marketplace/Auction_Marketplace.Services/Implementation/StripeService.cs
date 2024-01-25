using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Services.Interface;
using Stripe.Checkout;

namespace Auction_Marketplace.Services.Implementation
{
    public class StripeService : IStripeService
    {
        public Session CreateCheckoutSession(CauseViewModel cause)
        {
            var domain = "https://localhost:7141/"; // ToDo: add to appsettings
            var options = new SessionCreateOptions()
            {
                Mode = "payment",
                SuccessUrl = domain + "Checkout/OrderConfirmation", 
                CancelUrl = domain + "Checkout/CancelPayment",  
                LineItems = new List<SessionLineItemOptions>()
                {
                    new SessionLineItemOptions()
                    {
                        Quantity = 1,
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            UnitAmountDecimal = cause.Price,
                        }
                    }
                },
                PaymentMethodTypes = new List<string>()
                {
                    "card"
                    //ToDo: make the payments methods to be chosen from dashboard
                }
            };


            var service = new SessionService();
            Session session = service.Create(options);

            return session;
        }
    }
}

