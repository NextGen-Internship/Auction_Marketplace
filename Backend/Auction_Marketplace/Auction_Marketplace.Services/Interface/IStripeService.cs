using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Services.Abstract;
using Stripe;
using Stripe.Checkout;

namespace Auction_Marketplace.Services.Interface
{
	public interface IStripeService : IService
	{
		PaymentIntent CreateCheckoutSession();

		Task HandleWebhookEvent(string json, string stripeSignature);

		Task CreateConnectedUser(User user);

		bool CheckStripeAccount();
    }
}

