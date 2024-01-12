using Microsoft.AspNetCore.Mvc;
using Auction_Marketplace.Data.Models.Authentication;
using Auction_Marketplace.Services.Interface.Authentication;
using Microsoft.AspNetCore.Authorization;
using Auction_Marketplace.Data.Models.GoogleLogin;

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
            try
            {
                var response = await _autService.Register(registerUser);

                return response.Succeed == true ? Ok(response) : BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginViewModel loginUser)
        {
            try
            {
                var response = await _autService.Login(loginUser);

                return response.Succeed == true ? Ok(response) : Unauthorized(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginViewModel googleLogin)
        {
            try
            {
                return await _authService.GoogleLoginAsync(googleLogin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("Logout")]
        [Authorize]
        public async Task<IActionResult> LogOut()
        {

            try
            {
                await _autService.Logout();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            
        }

    }
}
