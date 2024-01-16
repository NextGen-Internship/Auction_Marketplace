using Microsoft.AspNetCore.Identity;
using Auction_Marketplace.Data.Models;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Data.Entities;
using Newtonsoft.Json;
using Auction_Marketplace.Data.Models.Google;
using Auction_Marketplace.Services.Interface;
using Microsoft.Extensions.Configuration;

namespace Auction_Marketplace.Services.Implementation
{
    public class AuthenticationUserService : IAuthenticationUserService
    {
        private readonly IUserService _userSevice;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthenticationUserService(IUserService userSevice,
                                        ITokenService tokenService,
                                        IEmailService emailService,
                                        UserManager<User> userManager,
                                        SignInManager<User> signInManager,
                                        IConfiguration configuration
                                        )
        {
            _userSevice = userSevice;
            _emailService = emailService;
            _tokenService = tokenService;
            _configuration = configuration;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<Response<string>> Register(RegisterViewModel registerUser)
        {
            var userExists = await _userSevice.GetByEmailAsync(registerUser.Email);
        
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
                 FirstName = registerUser.FirstName,
                 LastName = registerUser.LastName,
                 Email = registerUser.Email,      
                 SecurityStamp = Guid.NewGuid().ToString(),
                 UserName = registerUser.Email,
                 ProfilePicture = registerUser.ProfilePicture == "" ? "https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg"
                                                                      : registerUser.ProfilePicture
             };

            // ToDO:Seed roles
            //await _userManager.AddToRoleAsync(user, "User");

            //Creates the JWT
            var token = _tokenService.GenerateJwtToken(user);

            //ToDo: Generate new api key and dont post in on GitHub
            await _emailService.SendEmail("Register Confirmation Email", registerUser.Email, registerUser.Username, "ZDR KP");


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
       
              if (user != null)
              {
                  await _signInManager.CheckPasswordSignInAsync(user, loginUser.Password, false);

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

        public async Task<Response<string>> GoogleLoginAsync(GoogleLoginViewModel googleLogin)
        {

            var validation = await ValidateGoogleTokenAsync(googleLogin.GoogleToken);
            if (!validation.Succeed)
            {
                return new Response<string> { Succeed = false, Message = "Invalid User" };
            }

            var email = validation.Data;

            var existingUser = await _userSevice.GetByEmailAsync(email);

            if (existingUser == null)
            {
                var newUser = new RegisterViewModel
                {
                    FirstName = "",
                    LastName = "",
                    Email = email,
                    ProfilePicture = "https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg",
                    Password = "Password123"
                };

                var tokenResponse = await Register(newUser);

                return new Response<string> { Succeed = true, Data = tokenResponse.Data };

            }

            await _signInManager.SignInAsync(existingUser, false);

            // Generate JWT token
            var jwtToken = _tokenService.GenerateJwtToken(existingUser);

            return new Response<string> { Succeed = true, Data = jwtToken };
        
        }

        public async Task<Response<string>> ValidateGoogleTokenAsync(string googleToken)
        {
          using (var httpClient = new HttpClient())
          {
              var validationEndpoint = _configuration["ValidationEndpoint"] + googleToken;
              var response = await httpClient.GetAsync(validationEndpoint);
              if (response.IsSuccessStatusCode)
              {
                  var responseContent = await response.Content.ReadAsStringAsync();
                  var tokenInfo = JsonConvert.DeserializeObject<GoogleTokenInfo>(responseContent);
   
                  var validationResult = new Response<string>
                  {
                      Succeed = true,
                      Data = tokenInfo.Email
                  };
   
                  return validationResult;
              }
              else
              {
                  var validationResult = new Response<string>
                  {
                      Succeed = false,
                      Message = "Token validation failed."
                  };
   
                  return validationResult;
              }
          }
      }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}

