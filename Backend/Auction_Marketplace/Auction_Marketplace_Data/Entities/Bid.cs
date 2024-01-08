using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace_Data.Entities
{
	public class Bid
	{
		[Key]
		public int BidId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Auction")]
        public int AuctionId { get; set; }

        [ForeignKey("Item")]
        public int ItemId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
    }
}

