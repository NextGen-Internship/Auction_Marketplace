﻿namespace Auction_Marketplace.Data.Models.Donation
{
	public class CauseViewModel
	{
        public int UserId { get; set; }

        public string? Name { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public decimal AmountNeeded { get; set; }

        public decimal AmountCurrent { get; set; }

        public bool IsCompleted { get; set; }

        public ICollection<PaymentViewModel> Donations { get; set; } = new List<PaymentViewModel>();
    }
}

