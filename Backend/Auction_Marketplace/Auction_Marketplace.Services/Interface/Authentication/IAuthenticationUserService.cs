using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Data.Models.GoogleLogin;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Services.Interface.Authentication
{
    public interface IAuthenticationUserService
	{
        Task<Response<string>> Register(RegisterViewModel registerUser);

        Task<Response<string>> Login(LoginViewModel loginUser);

        Task<IActionResult> GoogleLoginAsync(GoogleLoginViewModel dto);

        Task Logout();
    }
}

