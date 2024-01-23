using System.ComponentModel.DataAnnotations;
using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Data.Models.Auction
{
	public class AuctionViewModel
	{
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Name is required")]
		public string? Name { get; set; } = string.Empty;

		[Required(ErrorMessage = "Description is required")]
		public string? Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "IsCompleted is required")]
        public bool IsCompleted { get; set; }
    }
}