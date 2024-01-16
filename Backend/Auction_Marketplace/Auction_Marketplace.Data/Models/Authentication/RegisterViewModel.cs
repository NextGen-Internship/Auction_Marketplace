using System;
using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Authentication
{
	public class RegisterViewModel
	{
        [Required(ErrorMessage = "FirstName is required")]
        public string? FirstName { get; set; } = null!;

        [Required(ErrorMessage = "LastName is required")]
        public string? LastName { get; set; } = null!;

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

        public string? ProfilePicture { get; set; }
    }
}

