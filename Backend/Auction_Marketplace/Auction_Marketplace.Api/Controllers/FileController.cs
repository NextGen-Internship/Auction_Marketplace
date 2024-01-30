using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Auction_Marketplace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
	{
        private readonly IS3Service _s3Service;
        public FileController(IS3Service s3Service)
        {
            _s3Service = s3Service;

        }

        [HttpGet("{documentName}")]
        public IActionResult GetDocumentFromS3(string documentName)
        {
            try
            {
                var document = _s3Service.DownloadFileAsync(documentName).Result;

                var contentType = "image/png";

                var fileContentResult = new FileContentResult(document, contentType)
                {
                    FileDownloadName = documentName
                };

                return fileContentResult;

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}

