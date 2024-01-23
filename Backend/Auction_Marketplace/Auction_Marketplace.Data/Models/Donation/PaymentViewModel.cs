using Auction_Marketplace.Data.Enums;

namespace Auction_Marketplace.Data.Models.Donation
{
	public class PaymentViewModel
	{
		public int PaymentId { get; set; }

		public int EndUserId { get; set; }

		public int? CauseId { get; set; }

		public int? AuctionId { get; set; }

		public PaymentFor Type { get; set; }

		public int MethodId { get; set; }

		public bool IsCompleted { get; set; }

		public decimal Amount { get; set; }

		public DateTime Date { get; set; }
	}
}

