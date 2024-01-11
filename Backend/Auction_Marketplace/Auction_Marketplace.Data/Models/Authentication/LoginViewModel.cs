using System;
using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Authentication
{
	public class LoginViewModel
	{
        [Required(ErrorMessage = "Username is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }
}

