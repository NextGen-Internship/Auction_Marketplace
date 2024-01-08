using System;
using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Api.Models.Authentication.Login
{
	public class LoginUser
	{
        [Required(ErrorMessage = "Username is required")]
         public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }
}

