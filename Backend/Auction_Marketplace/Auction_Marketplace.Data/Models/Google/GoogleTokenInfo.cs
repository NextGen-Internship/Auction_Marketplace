using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Auction_Marketplace.Data.Models.Google
{
    public class GoogleTokenInfo
	{
        [Required]
        public bool Succeed { get; set; }

        public string? Message { get; set; }

        [JsonPropertyName("given_name")]
        public string? FirstName { get; set; }

        [JsonPropertyName("family_name")]
        public string? LastName { get; set; }

        [JsonPropertyName("Wind")]
        public string? ProfilePicture { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }
    }
}

