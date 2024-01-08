using Auction_Marketplace.Api.Models;
using Auction_Marketplace.Api.Models.Authentication.Register;
using Auction_Marketplace.Api.Models.Authentication.Login;
using Auction_Marketplace_Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            var user = await _userManager.FindByNameAsync(loginUser.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                var jwtToken = GenerateJwtToken(user);

                return Ok(jwtToken);
            }

            return Unauthorized();
        }

        //Method which generates JWT Token
        private string GenerateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig: Secret").Value);

            var claims = new List<Claim>()
            {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString())
            };

            GenerateUserRoles(user, claims);

            
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)

            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }

        //Method which gets user roles and makes claims with them
        private async void GenerateUserRoles(User user, List<Claim> claims)
        {
            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
        }
    }
}
