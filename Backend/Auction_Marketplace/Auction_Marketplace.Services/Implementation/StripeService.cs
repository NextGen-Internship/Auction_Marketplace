using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Auction_Marketplace.Services.Implementation
{
    
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        public StripeService(IConfiguration configuration,
                            UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public PaymentIntent CreateCheckoutSession()
        {

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

        public async Task HandleWebhookEvent(string json, string stripeSignature)
        {
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    stripeSignature,
                    _configuration.GetSection("Stripe:WebhookSecret").Get<string>());

                switch (stripeEvent.Type)
                {
                    case Events.CustomerCreated:
                        await CustomerCreated(stripeEvent);
                        break;
                    case Events.CheckoutSessionAsyncPaymentSucceeded:
                        await HandleCheckoutSessionPaymentSucceeded(stripeEvent);
                        break;
                    case Events.CheckoutSessionAsyncPaymentFailed:
                        await HandleCheckoutSessionPaymentFailed(stripeEvent);
                        break;
                    default:
                        Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                        break;
                }
            }
            catch (StripeException e)
            {
                throw e;
            }
        }

        public async Task CreateConnectedUser(User user)
        {
            var options = new AccountCreateOptions
            {
                Type = "custom",
                BusinessType = "individual",
                Country = "BG",
                Email = user.Email,
                Capabilities = new AccountCapabilitiesOptions
                {
                    CardPayments = new AccountCapabilitiesCardPaymentsOptions
                    {
                        Requested = true,
                    },
                    Transfers = new AccountCapabilitiesTransfersOptions
                    {
                        Requested = true
                    },
                },
                Individual = new AccountIndividualOptions
                {
                    FirstName = "Sami",
                    LastName = "Hosny",
                    Address = new AddressOptions
                    {
                        Line1 = "ul Ivan Vazov 1",
                        City = "Sofia",
                        PostalCode = "2900",
                        Country = "BG",
                        
                    },
                    Email = user.Email,
                    Phone = "+359 89 546 7272",
                    Dob = new DobOptions
                    {
                        Day = 1,
                        Month = 1,
                        Year = 1990,
                    },
                },

                BusinessProfile = new AccountBusinessProfileOptions
                {
                    Mcc = "4816", // Merchant Category Code, if applicable
                    Url = "https://blankfactor.com/",
                },

                TosAcceptance = new AccountTosAcceptanceOptions
                {
                    Date = DateTime.UtcNow,
                    Ip = "127.0.0.1", 
                },

                ExternalAccount = new AccountBankAccountOptions
                {
                    AccountNumber = "BG80BNBG96611020345678",
                    Country = "BG",
                    Currency = "bgn",
                    AccountHolderType = "individual",
                },

            };
            var service = new AccountService();
            service.Create(options);
        }

        private async Task CustomerCreated(Event stripeEvent)
        {
            var customer = stripeEvent.Data.Object as Customer;

            var dbUser = await _userManager.FindByEmailAsync(customer.Email);

            if (dbUser != null)
            {
                dbUser.CustomerId = customer.Id;
                await _userManager.UpdateAsync(dbUser);
                Console.WriteLine("Created customer id");
            }
           
        }

        private async Task HandleCheckoutSessionPaymentSucceeded(Event stripeEvent)
        {
            var session = stripeEvent.Data.Object as PaymentIntent;
        }

        private async Task HandleCheckoutSessionPaymentFailed(Event stripeEvent)
        {
            var session = stripeEvent.Data.Object as PaymentIntent;
            // Handle payment failure logic
        }

    }
 }

