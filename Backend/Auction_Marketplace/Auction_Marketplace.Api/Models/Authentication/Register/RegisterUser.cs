using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Api.Models.Authentication.Register
{
    public class RegisterUser
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = null!;

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }
}
