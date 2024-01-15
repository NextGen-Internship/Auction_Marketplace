using Microsoft.AspNetCore.Identity;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Services.Interface;
using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Services.Implementation
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
                 FirstName =  registerUser.FirstName,
                 LastName = registerUser.LastName,
                 Email = registerUser.Email,      
                 SecurityStamp = Guid.NewGuid().ToString(),
                 UserName = registerUser.Email,
                 ProfilePicture = registerUser.ProfilePicture == "" ? "https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg"
                                                                      : registerUser.ProfilePicture
             };

            // Seed roles
            //await _userManager.AddToRoleAsync(user, "User");

            //Creates the JWT
            var token = _tokenService.GenerateJwtToken(user);

            //ToDo: Generate new api key and dont post in on GitHub
            //await _emailService.SendEmail("Register Confirmation Email", registerUser.Email, registerUser.Username, "Message");


            var isCreated = await _userManager.CreateAsync(user, registerUser.Password);
        
        
              if (!isCreated.Succeeded)
              {
                  return new Response<string>()
                      {
                          Succeed = false,
                          Message = "User Failed to Create!"
                      };
              }

              
        
              return new Response<string>()
                  {
                      Succeed = true,
                      Data = token
                  };
              
        }
        
        public async Task<Response<string>> Login(LoginViewModel loginUser)
        {
              var user = await _userManager.FindByNameAsync(loginUser.Email);
       
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

