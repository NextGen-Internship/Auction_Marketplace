using Auction_Marketplace.Services.Interface;
using Stripe;

namespace Auction_Marketplace.Services.Implementation
{
    
    public class StripeService : IStripeService
    {
        
        public PaymentIntent CreateCheckoutSession()
        {
            //var domain = _configuration["AppDomain"];
            //var options = new SessionCreateOptions()
            //{
            //    Mode = "payment",
            //    SuccessUrl = domain + "OrderConfirmation",
            //    CancelUrl = domain + "CancelPayment",
            //    LineItems = new List<SessionLineItemOptions>()
            //    {
            //        new SessionLineItemOptions()
            //        {
            //            Quantity = 1,
            //            PriceData = new SessionLineItemPriceDataOptions
            //            {
            //                Currency = "usd",
            //                UnitAmountDecimal = 100,
            //                ProductData= new SessionLineItemPriceDataProductDataOptions
            //                {
            //                    Name = "eho"
            //                }
            //            }
            //        }
            //    },
            //    PaymentMethodTypes = new List<string>()
            //    {
            //        "card"
            //        //ToDo: make the payments methods to be chosen from dashboard
            //    }
            //};

            //var service = new SessionService();
            //Session session = service.Create(options);

            //return session;

            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
            {
                Amount = 1000,
                Currency = "bgn",

                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            });

            return paymentIntent;


            
        }
    }
 }

