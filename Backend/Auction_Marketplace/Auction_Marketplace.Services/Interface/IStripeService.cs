using Auction_Marketplace.Data.Models.Stripe;
using Auction_Marketplace.Services.Abstract;
using Stripe.Checkout;

namespace Auction_Marketplace.Services.Interface
{
	public interface IStripeService : IService
	{
		Session CreateCheckoutSession(ItemOrDonationViewModel cause);
	}
}

