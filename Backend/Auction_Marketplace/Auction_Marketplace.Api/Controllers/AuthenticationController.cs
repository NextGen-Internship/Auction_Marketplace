using Auction_Marketplace.Api.Models;
using Auction_Marketplace.Api.Models.Authentication.Register;
using Auction_Marketplace_Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<User> userManager,
                                        RoleManager<IdentityRole> roleManager,
                                        IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;

        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            //Check if the model state`s valid
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response()
                   {
                       Status = "Error",
                       Message = "The Role Does Not Exists!"
                   });
            }

            //serching in the DB for a user with that email
            var userExists = await _userManager.FindByEmailAsync(registerUser.Email);

            //If user exists, return Bad Request
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response()
                {
                    Status = "Error",
                    Message = "User with this Email Adress already exists!"
                });
            }

            var user = new User()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username
            };

            //Checking if the role exists
            if (await _roleManager.RoleExistsAsync(role))
            {

                //Creating a new user
                var isCreated = await _userManager.CreateAsync(user, registerUser.Password);


                if (!isCreated.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response()
                        {
                            Status = "Error",
                            Message = "User Failed to Create!"
                        });
                }

                //ToDo: Create the JWT
                // var token = GenerateJwtToken(user);

                // Add the role to the user
                await _userManager.AddToRoleAsync(user, role);

                    return StatusCode(StatusCodes.Status201Created,
                        new Response()
                        {
                            Status = "Success",
                            Message = "User Created Successfully!"
                        });
            }

            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response()
                    {
                        Status = "Error",
                        Message = "The Role Does Not Exists!"
                    });
            }

        }

        

    }
}
