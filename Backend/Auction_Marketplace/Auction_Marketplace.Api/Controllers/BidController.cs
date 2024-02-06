using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [ApiController]
    [Route("api/Bid")]
    public class BidController : ControllerBase
    {
        private readonly IBidService _bidService;

        public BidController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [HttpPost("{id}")]
        [Authorize]
        public async Task<IActionResult> PlaceBid([FromBody] decimal bid, [FromRoute] int id)
        {
            try
            {
                var response = await _bidService.PlaceBid(bid, id);
                return response.Succeed == true ? Ok(response) : BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex.Message}");
            }
        }
    }

   
}

