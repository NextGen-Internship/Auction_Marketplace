using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Data.Models.Google;
using Auction_Marketplace.Services.Abstract;

namespace Auction_Marketplace.Services.Interface
{
    public interface IAuthenticationUserService : IService
	{
        Task<Response<string>> Register(RegisterViewModel registerUser);

        Task<Response<string>> Login(LoginViewModel loginUser);

        Task<GoogleResponse<string>> GoogleLoginAsync(GoogleLoginViewModel googleLogin);

        Task Logout();
    }
}

