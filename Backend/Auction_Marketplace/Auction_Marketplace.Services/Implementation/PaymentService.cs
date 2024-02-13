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



        public void CreatePayment(PaymentViewModel model)
        {

            var payment = new Payment()
            {
                UserPaymentMethodId = 0,
                Amount = model.Amount / 100,
                Date = model.Date,
                IsCompleted = model.IsCompleted,
                StripePaymentId = model.StripePaymentId,
            };


            var email = _contextAccessor.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = _userRepository.GetByEmailAsync(email).Result;
            var userId = user.Id;

            var cause = _causeRepository.FindCauseByUserId(userId);
            var causeId = cause.Result.CauseId;



            var endUser = _userRepository.GetUserByCustomerId(model.EndUserId) ;
            var endUserId = endUser.Result.Id;


            payment.CauseId = causeId;
            payment.UserId = userId;
            payment.EndUserId = endUserId;

            _paymentRepository.AddPayment(payment);
        }
    }
}

