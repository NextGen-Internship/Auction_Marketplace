using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Auction_Marketplace.Data.Enums;

namespace Auction_Marketplace.Data.Entities
{
	public class UserPaymentMethods
	{
        [Key]
        public int UserPaymentMethodId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        [Required]
        public PaymentMethod Method { get; set; }
        [Required]
        public bool IsDefault { get; set; }
    }
}

