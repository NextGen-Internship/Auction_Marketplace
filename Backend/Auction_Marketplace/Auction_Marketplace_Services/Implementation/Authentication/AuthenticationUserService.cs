using Auction_Marketplace_Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Auction_Marketplace_Services.Interface.Authentication;
//using Auction_Marketplace_Api.Models.Authentication.Login;

namespace Auction_Marketplace_Services.Implementation.Authentication
{
    public class AuthenticationUserService //: IAuthenticationService
    {
        //    private readonly UserManager<User> _userManager;
        //    private readonly RoleManager<IdentityRole> _roleManager;
        //    private readonly IConfiguration _configuration;
        //    private readonly ITokenService _tokenService;
        //
        //    public AuthenticationUserService(UserManager<User> userManager,
        //                                    RoleManager<IdentityRole> roleManager,
        //                                    IConfiguration configuration,
        //                                    ITokenService tokenService)
        //    {
        //        _userManager = userManager;
        //        _roleManager = roleManager;
        //        _configuration = configuration;
        //        _tokenService = tokenService;
        //    }
        //    public async Task Register([FromBody] RegisterUser registerUser, string role)
        //    { 
        //        var userExists = await _userManager.FindByEmailAsync(registerUser.Email);
        //
        //        if (userExists != null)
        //        {
        //            return StatusCode(StatusCodes.Status403Forbidden,
        //                new Response()
        //                {
        //                    Status = "Error",
        //                    Message = "User with this Email Adress already exists!"
        //                });
        //        }
        //
        //        var user = new User()
        //        {
        //            FirstName = registerUser.FirstName == null ? "" : registerUser.FirstName,
        //            LastName = registerUser.LastName == null ? "" : registerUser.LastName,
        //            Email = registerUser.Email,
        //            SecurityStamp = Guid.NewGuid().ToString(),
        //            UserName = registerUser.Username
        //        };
        //
        //        if (await _roleManager.RoleExistsAsync(role))
        //        {
        //
        //            var isCreated = await _userManager.CreateAsync(user, registerUser.Password);
        //
        //
        //            if (!isCreated.Succeeded)
        //            {
        //                return StatusCode(StatusCodes.Status500InternalServerError,
        //                    new Response()
        //                    {
        //                        Status = "Error",
        //                        Message = "User Failed to Create!"
        //                    });
        //            }
        //
        //            //ToDo: Create the JWT
        //            var token = GenerateJwtToken(user);
        //
        //
        //            await _userManager.AddToRoleAsync(user, role);
        //
        //            return StatusCode(StatusCodes.Status201Created,
        //                new Response()
        //                {
        //                    Status = "Success",
        //                    Message = "User Created Successfully!"
        //                });
        //        }
        //
        //        else
        //        {
        //            return new Response()
        //                {
        //                    Status = "Error",
        //                    Message = "The Role Does Not Exists!"
        //                };
        //        }
        //
        //    }
        //
        //    public async Task<string?> Login(LoginUser loginUser)
        //    {
        //        var user = await _userManager.FindByNameAsync(loginUser.Username);
        //
        //        if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
        //        {
        //            var jwtToken = _tokenService.GenerateJwtToken(user);
        //
        //            return jwtToken;
        //        }
        //
        //        return null;
        //    }
        //
        //    
        //}
    }
}

