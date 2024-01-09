using Auction_Marketplace.Api.Models;
using Auction_Marketplace.Api.Models.Authentication.Register;
using Auction_Marketplace_Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Auction_Marketplace_Services.Implementation.Authentication;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
  //    private readonly AuthenticationUserService _autService;
  //
  //    public AuthenticationController(AuthenticationUserService autService)
  //    {
  //        _autService = autService;
  //    }
  //
  //    [HttpPost]
  //    [Route("Register")]
  //    public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
  //    {
  //        if (!ModelState.IsValid)
  //        {
  //            return StatusCode(StatusCodes.Status500InternalServerError,
  //               new Response()
  //               {
  //                   Status = "Error",
  //                   Message = "The Role Does Not Exists!"
  //               });
  //        }
  //
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
  //            return StatusCode(StatusCodes.Status500InternalServerError,
  //                new Response()
  //                {
  //                    Status = "Error",
  //                    Message = "The Role Does Not Exists!"
  //                });
  //        }
  //
  //    }
  //
  //    [HttpPost]
  //    [Route("Login")]
  //    public async Task<IActionResult> Login()
  //    {
  //        var token = await _autService.Login();
  //        return Unauthorized();
  //    }
  }
}
