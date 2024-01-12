using System;
namespace Auction_Marketplace.Data.Models.Authentication
{
	public class GoogleLoginViewModel
	{
        public string Username { set; get; }

        public string Email { set; get; }

        public string GoogleToken { get; set; }
    }
}

