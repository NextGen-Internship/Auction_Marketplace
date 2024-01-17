using System;
using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Google
{
    public class GoogleLoginViewModel
    {
        [Required(ErrorMessage = "Google Token is required")]
        public string GoogleToken { get; set; } = null!;
    }
}

