using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Auction_Marketplace_Data.Entities.Abstract;

namespace Auction_Marketplace_Data.Entities
{
	public class Bid : IBaseEntity
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

        // Implementing IBaseEntity interface
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

