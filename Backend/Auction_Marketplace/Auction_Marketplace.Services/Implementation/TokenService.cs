﻿using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Auction_Marketplace.Data.Entities;
<<<<<<< HEAD
using Auction_Marketplace.Services.Interfaces;
=======
using Auction_Marketplace.Services.Interface;
>>>>>>> 5074f1c85e21042d1dcc32e1afdce6da800b745a

namespace Auction_Marketplace.Services.Implementation
{
    public class TokenService : ITokenService
	{
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public TokenService(UserManager<User> userManager,
                            IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;

        }

        public string GenerateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            var claims = new List<Claim>()
            {
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString())
            };

           // GenerateUserRoles(user, claims);


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

        public async void GenerateUserRoles(User user, List<Claim> claims)
        {
            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
        }
    }
}

