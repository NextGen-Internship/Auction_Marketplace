
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Models.Cause;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CauseController : ControllerBase
	{
        private readonly ICauseService _causeService;

        public CauseController(ICauseService causeService)
		{
            _causeService = causeService;
		}

        [HttpGet]
        [Route("All")]
        public async Task<IActionResult> GetAllCauses()
        {
            try
            {
                List<Cause> causes = await _causeService.GetAllCauses();
                return Ok(causes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCauseById([FromRoute] int id)
        {
            var cause = await _causeService.GetCauseById(id);

            if (cause == null)
            {
                return NotFound();
            }

            return Ok(cause);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCause(CauseViewModel cause)
        {
            try
            {
                var response = await _causeService.CreateCause(cause);

                return response.Succeed == true ? Ok(response) : BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCause([FromRoute] int id, CauseViewModel updatedCause)
        {
            try
            {
                var response = await _causeService.UpdateCause(id, updatedCause);

                return response.Succeed == true ? Ok(response) : BadRequest(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCause([FromRoute] int id)
        {
            try
            {
                var response = await _causeService.DeleteCause(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}

