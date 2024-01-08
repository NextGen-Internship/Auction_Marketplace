using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace.Data.Entities
{
	public class Items
	{

        [Key]
        public int ItemId { get; set; }
        [ForeignKey("Auctions")]
        public int AuctionId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public decimal StartPrice { get; set; }
        [Required]
        public decimal FinalPrice { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public bool IsDeleted { get; set; }

    }
}

