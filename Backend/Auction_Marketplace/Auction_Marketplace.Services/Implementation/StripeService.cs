using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Stripe.Checkout;

namespace Auction_Marketplace.Services.Implementation
{
    
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _configuration;

        public StripeService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Session CreateCheckoutSession(ItemOrDonationViewModel cause)
        {
            var domain = _configuration["AppDomain"];
            var options = new SessionCreateOptions()
            {
                Mode = "payment",
                SuccessUrl = domain + "OrderConfirmation",
                CancelUrl = domain + "CancelPayment",
                LineItems = new List<SessionLineItemOptions>()
                {
                    new SessionLineItemOptions()
                    {
                        Quantity = 1,
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            UnitAmountDecimal = 100,
                            ProductData= new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "eho"
                            }
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

