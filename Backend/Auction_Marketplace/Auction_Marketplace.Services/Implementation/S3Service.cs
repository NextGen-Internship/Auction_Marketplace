using Auction_Marketplace.Services.Interface;
using Microsoft.AspNetCore.Http;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon;

namespace Auction_Marketplace.Services.Implementation
{
	public class S3Service : IS3Service
	{
		//private readonly IAmazonS3 _s3Client;
        private readonly IConfiguration _configuration;


        public S3Service(IConfiguration configuration)
		{
			//_s3Client = s3Client;
            _configuration = configuration;
		}

        public async Task<string> UploadFileAsync(IFormFile file, string path, string fileName)
        {
            var s3Client = new AmazonS3Client("AKIA5V4FKJ37BVNWYUWQ", "ZhCRGnOKyahzLpT0NgC2gMDE2gsdKuv5rXYZ8pDF", RegionEndpoint.EUCentral1);


            var bucketName = _configuration.GetSection("AWS").GetValue<string>("bf-int-auction-marketplace");

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = file.OpenReadStream(),
                Key = $"{path}/{fileName}",
                BucketName = bucketName,
                CannedACL = S3CannedACL.NoACL,
                ContentType = file.ContentType
            };

            using (var fileTrasferUtility = new TransferUtility(s3Client))
            {
                await fileTrasferUtility.UploadAsync(uploadRequest);
            }

            var expiryUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = $"{path}/{fileName}"
            };

            var url = s3Client.GetPreSignedURL(expiryUrlRequest);

            return url;
        }


    }
}