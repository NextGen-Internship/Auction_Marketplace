using Auction_Marketplace_Data.Entities;
using Microsoft.AspNetCore.Identity;
using Auction_Marketplace_Services.Interface.Authentication;
using Auction_Marketplace_Data.Models.Authentication;
using Auction_Marketplace_Data.Models;
using Auction_Marketplace_Services.Interface.Email;

namespace Auction_Marketplace_Services.Implementation.Authentication
{
    public class AuthenticationUserService : IAuthenticationUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly SignInManager<User> _signInManager;

        public AuthenticationUserService(UserManager<User> userManager,
                                        ITokenService tokenService,
                                        SignInManager<User> signInManager,
                                        IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        public async Task<Response<string>> Register(RegisterViewModel registerUser)
        { 
             var userExists = await _userManager.FindByEmailAsync(registerUser.Email);
        
             if (userExists != null)
             {
                 return new Response<string>()
                     {
                         Succeed = false,
                         Message = "User with this Email Adress already exists!"
                     };
             }
        
             var user = new User()
             {
                 FirstName = registerUser.FirstName == null ? "" : registerUser.FirstName,
                 LastName = registerUser.LastName == null ? "" : registerUser.LastName,
                 Email = registerUser.Email,
                 SecurityStamp = Guid.NewGuid().ToString(),
                 UserName = registerUser.Username
             };
        
        
              var isCreated = await _userManager.CreateAsync(user, registerUser.Password);
        
        
              if (!isCreated.Succeeded)
              {
                  return new Response<string>()
                      {
                          Succeed = false,
                          Message = "User Failed to Create!"
                      };
              }
        
              //ToDo: Create the JWT
              var token = _tokenService.GenerateJwtToken(user);

              await _emailService.SendEmail("Register Confirmation Email", registerUser.Email, registerUser.Username, "Welcome");

              await _userManager.AddToRoleAsync(user, "User");
        
              return new Response<string>()
                  {
                      Succeed = true,
                      Data = token
                  };
              
        }
        
        public async Task<Response<string>> Login(LoginViewModel loginUser)
        {
              var user = await _userManager.FindByNameAsync(loginUser.Username);
       
              if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
              {
                  var jwtToken = _tokenService.GenerateJwtToken(user);
       
                  return new Response<string>()
                  {
                      Succeed = true,
                      Data = jwtToken
                  };
              }
       
              return new Response<string>()
              {
                  Succeed = false,
                  Message = "Invalid User"
              };
       
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

    }
}

