using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace.Data.Entities
{
	public class Auctions
	{
        [Key]
        public int AuctionId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public bool IsCompleted { get; set; }
    }
}

