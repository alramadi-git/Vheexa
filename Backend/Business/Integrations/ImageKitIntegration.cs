using Imagekit.Sdk;

using System.Net;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

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

    public ClsImagekitIntegration(IOptions<ClsImagekitOptions> options)
    {
        _ImagekitClient = new ImagekitClient(options.Value.PublicKey, options.Value.PrivateKey, options.Value.UrlEndPoint);
    }

    public async Task<ClsImagekit?> UploadOneAsyncSafe(IFormFile image, string path)
    {
        try
        {
            var newImage = await _ImagekitClient.UploadAsync(new FileCreateRequest
            {
                useUniqueFileName = true,
                file = image,
                folder = path,
                fileName = image.FileName,
            });

            return new ClsImagekit
            {
                Id = newImage.fileId,
                Url = newImage.url,
            };
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