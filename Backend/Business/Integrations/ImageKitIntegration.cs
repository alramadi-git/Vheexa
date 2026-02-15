using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

using Microsoft.AspNetCore.Http;

using Imagekit.Sdk;

using System.Net;

namespace Business.Integrations;

public class ClsImagekitIntegration
{
    public class ClsImagekitOptions
    {
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }
        public string UrlEndPoint { get; set; }
    }

    public class ClsImagekit
    {
        public string Id { get; set; }
        public string Url { get; set; }
    }

    private readonly ImagekitClient _ImagekitClient;
    private readonly ILogger<ClsImagekitIntegration> _Logger;

    public ClsImagekitIntegration(IOptions<ClsImagekitOptions> options, ILogger<ClsImagekitIntegration> logger)
    {
        _ImagekitClient = new ImagekitClient(options.Value.PublicKey, options.Value.PrivateKey, options.Value.UrlEndPoint);
        _Logger = logger;
    }

    public async Task<ClsImagekit?> UploadOneAsyncSafe(IFormFile image, string path)
    {
        try
        {
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                var imageBytes = memoryStream.ToArray();

                var newImage = await _ImagekitClient.UploadAsync(new FileCreateRequest
                {
                    useUniqueFileName = true,
                    folder = path,
                    fileName = image.FileName,
                    file = imageBytes
                });

                return new ClsImagekit
                {
                    Id = newImage.fileId,
                    Url = newImage.url
                };
            }
        }
        catch
        {
            return null;
        }
    }

    public async Task<ClsImagekit[]> UploadManyAsyncSafe(IFormFile[] images, string path)
    {
        var newImages = await Task.WhenAll(images.Select(image => UploadOneAsyncSafe(image, path)));

        var succeededImages = newImages.Where(image => image != null).Select(image => image!).ToArray();
        return succeededImages;
    }

    public async Task<bool> DeleteImageAsync(string imageId)
    {
        var result = await _ImagekitClient.DeleteFileAsync(imageId);

        return result.HttpStatusCode == (int)HttpStatusCode.NoContent;
    }

    public async Task<bool> DeleteFolderAsync(string folderPath)
    {
        var result = await _ImagekitClient.DeleteFolderAsync(new Imagekit.Models.DeleteFolderRequest
        {
            folderPath = folderPath
        });

        return result.HttpStatusCode == (int)HttpStatusCode.NoContent;
    }
}