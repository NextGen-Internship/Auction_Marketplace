using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Models.Authentication
{
	public class RegisterViewModel
	{
        public string? FirstName { get; set; } 

        public string? LastName { get; set; } 

        public string? Username { get; set; } 

        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; } 

        public string? ProfilePicture { get; set; }
    }
}

