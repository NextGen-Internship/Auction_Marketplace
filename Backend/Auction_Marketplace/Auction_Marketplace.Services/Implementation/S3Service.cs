using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Auction_Marketplace.Services.Implementation
{
	public class S3Service : IS3Service
	{
		private readonly IAmazonS3 _s3Client;
        private readonly IConfiguration _configuration;


        public S3Service(IConfiguration configuration, IAmazonS3 s3Client)
		{
			_s3Client = s3Client;
            _configuration = configuration;
		}

        public async Task<string> UploadFileAsync(IFormFile file, string path, string fileName)
        {
            string bucketName = _configuration["AWS:BUCKET_NAME"];
            string key = $"{path}/{fileName}"; 

            
            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = file.OpenReadStream(),
                Key = $"{path}/{fileName}",
                BucketName = bucketName,
                CannedACL = S3CannedACL.NoACL,
                ContentType = file.ContentType
            };

            using (var fileTrasferUtility = new TransferUtility(_s3Client))
            {
                await fileTrasferUtility.UploadAsync(uploadRequest);
            }

            var expiryUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = $"{path}/{fileName}",
                Expires = DateTime.UtcNow.AddDays(7)
            };

            var url = _s3Client.GetPreSignedURL(expiryUrlRequest);

            return url;
            
        }

        public async Task<byte[]> DownloadFileAsync(string file)
        {
            MemoryStream ms = null;

            try
            {
                var getObjectRequest = new Amazon.S3.Model.GetObjectRequest
                {
                    BucketName = _configuration["AWS:BUCKET_NAME"],
                    Key = file
                };

                using (var response = await _s3Client.GetObjectAsync(getObjectRequest))
                {
                    if (response.HttpStatusCode == HttpStatusCode.OK)
                    {
                        using (ms = new MemoryStream())
                        {
                            await response.ResponseStream.CopyToAsync(ms);
                        }
                    }
                }

                if (ms is null || ms.ToArray().Length < 1)
                    throw new FileNotFoundException(string.Format("The document '{0}' is not found", file));

                return ms.ToArray();
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}