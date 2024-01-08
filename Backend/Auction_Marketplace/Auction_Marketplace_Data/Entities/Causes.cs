using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace.Data.Entities
{
	public class Causes
	{
        [Key]
        public int CauseId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public decimal AmountNeeded { get; set; }
        [Required]
        public decimal AmountCurrent { get; set; }
        [Required]
        public bool IsCompleted { get; set; }
    }
}

