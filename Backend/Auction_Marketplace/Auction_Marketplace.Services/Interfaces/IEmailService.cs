namespace Auction_Marketplace.Services.Interfaces
{
	public interface IEmailService
	{
		Task SendEmail(string subject, string toEmail, string username, string message);
	}
}

