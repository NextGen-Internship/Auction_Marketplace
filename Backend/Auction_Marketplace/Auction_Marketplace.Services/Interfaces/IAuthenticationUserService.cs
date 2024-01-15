using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Data.Models.Google;

namespace Auction_Marketplace.Services.Interfaces
{
    public interface IAuthenticationUserService
	{
        Task<Response<string>> Register(RegisterViewModel registerUser);

        Task<Response<string>> Login(LoginViewModel loginUser);

        Task<Response<string>> GoogleLoginAsync(GoogleLoginViewModel dto);

        Task<Response<string>> ValidateGoogleTokenAsync(string googleToken);

        Task Logout();
    }
}

