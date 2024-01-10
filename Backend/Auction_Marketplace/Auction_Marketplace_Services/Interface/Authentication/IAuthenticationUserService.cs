using Auction_Marketplace_Data.Models;
using Auction_Marketplace_Data.Models.Authentication;

namespace Auction_Marketplace_Services.Interface.Authentication
{
    public interface IAuthenticationUserService
	{
        Task<Response<string>> Register(RegisterViewModel registerUser);

        Task<Response<string>> Login(LoginViewModel loginUser);

        Task Logout();
    }
}

