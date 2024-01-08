using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auction_Marketplace_Data.Entities
{
	public class Cause
	{
        [Key]
        public int CauseId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AmountNeeded { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AmountCurrent { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsCompleted { get; set; }
    }
}

