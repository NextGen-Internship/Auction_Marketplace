using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Auction_Marketplace.Data.Models.User;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpContext;

        public UserController(IUserService userService, IHttpContextAccessor httpContext)
		{
            _userService = userService;
            _httpContext = httpContext;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserByEmail()
        {
            try
            {
                var email = _httpContext.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

                if(email is null)
                {
                    return Unauthorized();
                }

                var response = await _userService.GetUserByViewModel(email);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}

