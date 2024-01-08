using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Auction_Marketplace.Data.Enums;

namespace Auction_Marketplace.Data.Entities
{
	public class Payment
	{
        [Key]
        public int PaymentId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        [ForeignKey("Users")]
        public int EndUserId { get; set; }
        [ForeignKey("Causes")]
        public int? CauseId { get; set; }
        [ForeignKey("Auctions")]
        public int? AuctionId { get; set; }
        [ForeignKey("UserPaymentMethods")]
        public int UserPaymentMethodId { get; set; }
        [Required]
        public PaymentFor Type { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public bool IsCompleted{ get; set; }
     
    }
}

