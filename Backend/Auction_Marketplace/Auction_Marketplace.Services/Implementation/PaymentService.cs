using System;
using System.Security.Claims;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models.Donation;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Http;

namespace Auction_Marketplace.Services.Implementation
{
    public class PaymentService : IPaymentService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly ICauseRepository _causeRepository;
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IHttpContextAccessor contextAccessor,
                            IUserRepository userRepository,
                            ICauseRepository causeRepository,
                            IPaymentRepository paymentRepository)
        {
            _contextAccessor = contextAccessor;
            _userRepository = userRepository;
            _causeRepository = causeRepository;
            _paymentRepository = paymentRepository;
        }



        public void CreatePayment(string paymentId, decimal amount, DateTime date, bool isCompleted, int startUserId, int endUserId)
        {

            try
            {
                var payment = new Payment()
                {
                    Amount = amount / 100,
                    IsCompleted = isCompleted,
                    StripePaymentId = paymentId,
                    EndUserId = endUserId,
                    UserId = startUserId
                };

                var cause = _causeRepository.FindCauseByUserId(endUserId);
                var causeId = cause.Result.CauseId;

                payment.CauseId = causeId;

                _paymentRepository.AddPayment(payment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

