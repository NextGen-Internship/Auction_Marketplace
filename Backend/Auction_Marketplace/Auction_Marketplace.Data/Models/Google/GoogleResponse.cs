using System;
namespace Auction_Marketplace.Data.Models.Google
{
	public class GoogleResponse<T>
	{
        public bool Succeed { get; set; }

        public string? Message { get; set; }

        public T? Data { get; set; }
    }
}

