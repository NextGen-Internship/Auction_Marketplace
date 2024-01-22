using Microsoft.AspNetCore.Mvc;
using Auction_Marketplace.Services.Interface;
using Auction_Marketplace.Services.Implementation;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models.Auction;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionsService _auctionsService;

		public AuctionController(IAuctionsService auctionsService)
		{
            _auctionsService = auctionsService;
		}

        [HttpGet]
        [Route("All")]
        public async Task<IActionResult> GetAllAuctions()
        {
            try
            {
                var auctions = await _auctionsService.GetAllAuctions();
                return Ok(auctions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuctionById(int id)
        {
            var auction = await _auctionsService.GetAuctionById(id);

            if (auction == null)
            {
                return NotFound();
            }

            return Ok(auction);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateAuction(AuctionViewModel auction)
        {  
            try
            {
                var response = await _auctionsService.CreateAuction(auction);

                return response.Succeed == true ? Ok(response) : BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex.Message}");
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            await _auctionsService.DeleteAuction(id);
            return NoContent();
        }
    }
}

