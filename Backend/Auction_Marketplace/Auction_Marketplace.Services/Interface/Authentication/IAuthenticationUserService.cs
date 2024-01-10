using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Authentication;

namespace Auction_Marketplace.Services.Interface.Authentication
{
    public interface IAuthenticationUserService
	{
        Task<Response<string>> Register(RegisterViewModel registerUser);

        Task<Response<string>> Login(LoginViewModel loginUser);

        Task Logout();
    }
}

