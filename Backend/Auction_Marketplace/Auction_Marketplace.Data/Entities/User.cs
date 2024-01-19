using Auction_Marketplace.Data.Entities.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Auction_Marketplace.Data.Entities
{
    public class User : IdentityUser<int>, IBaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [MaxLength(255)]
        public string ProfilePicture { get; set; }

        // Implementing IBaseEntity interface
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedOn { get; set; }
    }
}
