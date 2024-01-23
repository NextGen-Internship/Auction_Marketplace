using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Cause
{
	public class CauseViewModel
	{
        [Required]
        public int CauseId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string? Name { get; set; } = string.Empty;

        [Required]
        public string? Description { get; set; } = string.Empty;

        [Required]
        public decimal AmountNeeded { get; set; }

        [Required]
        public decimal AmountCurrent { get; set; }

        [Required]
        public bool IsCompleted { get; set; }

    }
}

