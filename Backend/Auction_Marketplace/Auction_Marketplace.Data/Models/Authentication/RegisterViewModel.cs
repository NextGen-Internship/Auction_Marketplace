using System;
using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Authentication
{
	public class RegisterViewModel
	{
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; } = null!;

        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = null!;

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;

        public string ProfilePicture { get; set; } = null!;
    }
}

