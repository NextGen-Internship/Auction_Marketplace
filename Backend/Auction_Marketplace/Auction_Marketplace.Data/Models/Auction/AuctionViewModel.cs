using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Auction
{
	public class AuctionViewModel
	{
        public int UserId { get; set; }

		public string? Name { get; set; } = string.Empty;

		public string? Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }
    }
}