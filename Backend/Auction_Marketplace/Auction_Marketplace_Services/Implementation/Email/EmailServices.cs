using System;
using Auction_Marketplace_Services.Interface.Email;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Auction_Marketplace_Services.Implementation.Email
{
    public class EmailServices : EmailInterface
    {
        public async Task SendEmail(string subject, string toEmail, string username, string message)
        {
            var apiKey = Environment.GetEnvironmentVariable("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");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("lyuben.kulishev@blankfactor.com", "Auction Marketplace");
            var to = new EmailAddress(toEmail, username);
            var plainTextContent = message;
            var htmlContent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}

