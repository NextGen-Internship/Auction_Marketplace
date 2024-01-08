using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace_Data.Entities
{
	public class Item
	{
        [Key]
        public int ItemId { get; set; }

        [ForeignKey("Auction")]
        public int AuctionId { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal StartPrice { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal FinalPrice { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

    }
}

