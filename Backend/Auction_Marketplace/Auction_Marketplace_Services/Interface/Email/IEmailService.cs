using System;
namespace Auction_Marketplace_Services.Interface.Email
{
	public interface IEmailService
	{
		Task SendEmail(string subject, string toEmail, string username, string message);
	}
}

