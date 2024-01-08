using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace.Data.Entities
{
	public class Bid
	{
		[Key]
		public int BidId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        [ForeignKey("Auctions")]
        public int AuctionId { get; set; }
        [ForeignKey("Items")]
        public int ItemId { get; set; }
        [Required]
        public decimal Amount { get; set; }
    }
}

