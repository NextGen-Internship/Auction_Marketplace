using System;
using Microsoft.AspNetCore.SignalR;

namespace Auction_Marketplace.Services.Hubs
{
	public class CountdownHub : Hub
	{
		public CountdownHub()
		{
		}

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}

