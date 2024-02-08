using System;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Services.Abstract;
using static System.Runtime.InteropServices.JavaScript.JSType;
namespace Auction_Marketplace.Services.Interface
{
    public interface IPaymentService: IService
    {
        void CreatePayment(string paymentId, decimal amount, DateTime date, bool isCompleted, string endUserCustomerId );
    }
}

