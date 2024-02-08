using System.Security.Claims;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models.Donation;
using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;

namespace Auction_Marketplace.Services.Implementation
{
    
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly ICauseRepository _causeRepository;
        private readonly IPaymentService _paymentService;

        public StripeService(IConfiguration configuration,
                            UserManager<User> userManager,
                            IHttpContextAccessor contextAccessor,
                            IUserRepository userRepository,
                            ICauseRepository causeRepository,
                            IPaymentService paymentService)
        {
            _configuration = configuration;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
            _userRepository = userRepository;
            _causeRepository = causeRepository;
            _paymentService = paymentService;
        }

        public async Task<Session?> CreateCheckoutSession(DonationAmountViewModel model)
        {
            var domain = _configuration["Domain"];

            var user = GetUserByCauseId(model.CauseId);

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "bgn",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "Donation for charity cause"
                            },
                            UnitAmount = model.Amount * 100,
                        },
                        Quantity = 1
                    },
                },
                Mode = "payment",
                SuccessUrl = $"{domain}/completion",
                CancelUrl = $"{domain}/cancel",
                PaymentIntentData = new SessionPaymentIntentDataOptions
                {
                    TransferData = new SessionPaymentIntentDataTransferDataOptions
                    {
                        Destination = user.Result?.CustomerId // Set this to the ID of the destination account
                    }
                }

            };

            var service = new SessionService();

            var session = await service.CreateAsync(options);

            return session;

        }

        public async Task CreateConnectedUser(StripeFormViewModel model)
        {
            DateTime dob;
            DateTime.TryParse(model.DateOfBirth, out dob);

            try
            {
                var options = new AccountCreateOptions
                {
                    Type = "custom",
                    BusinessType = "individual",
                    Country = model.CountryCode,
                    Email = model.Email,
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
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Address = new AddressOptions
                        {
                            Line1 = model.Street,
                            City = model.City,
                            PostalCode = model.PostalCode,
                            Country = model.CountryCode,
                        },
                        Email = model.Email,
                        Phone = model.Phone,
                        Dob = new DobOptions
                        {
                            Day = dob.Day,
                            Month = dob.Month,
                            Year = dob.Year,
                        },
                    },

                    BusinessProfile = new AccountBusinessProfileOptions
                    {
                        Mcc = "4816",
                        Url = "https://blankfactor.com/",
                    },

                    TosAcceptance = new AccountTosAcceptanceOptions
                    {
                        Date = DateTime.UtcNow,
                        Ip = "127.0.0.1",
                    },

                    ExternalAccount = new AccountBankAccountOptions
                    {
                        AccountNumber = model.BankAccountNumber,
                        Country = model.CountryCode,
                        Currency = "bgn",
                        AccountHolderType = "individual",
                    },

                };
                var service = new AccountService();
                var account = await service.CreateAsync(options);

                var dbUser = await _userManager.FindByEmailAsync(model.Email);

                if (dbUser != null)
                {
                    dbUser.CustomerId = account.Id;
                    await _userRepository.UpdateUserInfo(dbUser);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckStripeAccount()
        {
           var email = _contextAccessor.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

           var user = _userRepository.GetByEmailAsync(email).Result;

            if (user != null)
            {
                return user.CustomerId == null ? false : true;
            }

            return false;
        }

        public async Task PayOut()
        {
            try
            {

                var transferOptions = new TransferCreateOptions
                {
                    Amount = 100,
                    Currency = "bgn",
                    Destination = "acct_1OgRxvR3StvO8rJd",
                    TransferGroup = "transfer_group_" + Guid.NewGuid().ToString(),
                    Metadata = new Dictionary<string, string> { { "SourceAccountId", "acct_1OgY2LQpQc0YoOzE" } }
                 };

                 var transferService = new TransferService();
                 var transfer = transferService.Create(transferOptions);

                 Console.WriteLine($"Transfer ID: {transfer.Id}");
                
            }
            catch (StripeException stripeException)
            {
                Console.WriteLine($"Stripe Exception: {stripeException.Message}");
            }
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
                        await HandleCheckoutSessionPaymentSucceeded(stripeEvent);
                        break;
                }
            }
            catch (StripeException e)
            {
                throw e;
            }
        }

        private async Task<User?> GetUserByCauseId(int customerId)
        {
            var cause = _causeRepository.FindCauseById(customerId);

            var userId = cause.Result.UserId;

            var user = await _userRepository.GetUserById(userId);

            return user;
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
            var paymentIntent = stripeEvent.Data.Object as PaymentIntent;


            var paymentId = paymentIntent.Id;
            var amount = paymentIntent.Amount;
            var paymentStatus = paymentIntent.Status;
            var id = paymentIntent.CustomerId;
            bool isCompleted;

            if (paymentStatus == "succeeded")
            {
                isCompleted = true;
            }
            else
            {
                isCompleted = false;
            }
            var date = DateTime.Now;
            var endUserCustomerId = paymentIntent.CustomerId;
            try
            {
                
                 _paymentService.CreatePayment(paymentId,amount, date, isCompleted, endUserCustomerId);
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private async Task HandleCheckoutSessionPaymentFailed(Event stripeEvent)
        {
            var session = stripeEvent.Data.Object as PaymentIntent;
            // Handle payment failure logic
        }

       
    }
 }

