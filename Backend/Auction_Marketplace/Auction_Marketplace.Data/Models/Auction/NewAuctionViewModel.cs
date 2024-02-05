using Microsoft.AspNetCore.Http;

namespace Auction_Marketplace.Data.Models.Auction
{
	public class NewAuctionViewModel
	{
		public string? Name { get; set; } = string.Empty;

		public string? Description { get; set; } = string.Empty;

		public IFormFile Photo { get; set; } 
	}
}

