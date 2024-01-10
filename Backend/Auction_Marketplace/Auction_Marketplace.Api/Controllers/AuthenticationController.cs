using Microsoft.AspNetCore.Mvc;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Services.Interface.Authentication;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationUserService _autService;

        public AuthenticationController(IAuthenticationUserService autService)
        {
            _autService = autService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var response = await _autService.Register(registerUser);

            return response.Succeed == true ? Ok(response) : BadRequest(response);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginViewModel loginUser)
        {
            var response = await _autService.Login(loginUser);

            return response.Succeed == true ? Ok(response) : Unauthorized(response);
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> LogOut()
        {
            await _autService.Logout();

            return Ok();
        }

    }
}
