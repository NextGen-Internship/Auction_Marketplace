using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Auction_Marketplace.Data.Enums;

namespace Auction_Marketplace.Data.Entities
{
	public class Reviews
	{
        [Key]
        public int ReviewId { get; set; }
        [ForeignKey("Causes")]
        public int CauseId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public string Comment { get; set; }
        [Required]
        public RatingStar Rating { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
    }
}

