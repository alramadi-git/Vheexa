using Imagekit.Sdk;

using Microsoft.AspNetCore.Http;

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

    public ClsImagekitIntegration(ClsImagekitOptions options)
    {
        _ImagekitClient = new ImagekitClient(options.PublicKey, options.PrivateKey, options.UrlEndPoint);
    }

    public async Task<ClsImagekit?> UploadOneAsyncSafe(IFormFile image, string path)
    {
        try
        {
            var newImage = await _ImagekitClient.UploadAsync(new FileCreateRequest
            {
                folder = path,
                useUniqueFileName = true,
                file = image
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

        var filteredImages = newImages.Where(image => image != null).Select(image => image!).ToArray();

        return filteredImages;
    }

    public async Task DeleteImageAsync(string imageId)
    {
        _ImagekitClient.DeleteFile(imageId);
    }

    public async Task<bool> DeleteFolderAsync(string folderPath)
    {
        return (await _ImagekitClient.DeleteFolderAsync(new Imagekit.Models.DeleteFolderRequest
        {
            folderPath = folderPath
        })).HttpStatusCode == (int)HttpStatusCode.NoContent;
    }
}