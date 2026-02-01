using Imagekit.Sdk;
using Microsoft.AspNetCore.Http;

namespace Business.Integrations;

public class ClsImagekitIntegration
{
    public class ClsImagekitOptions
    {
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }
        public string UrlEndPoint { get; set; }
    }

    private readonly ImagekitClient _ImagekitClient;

    public ClsImagekitIntegration(ClsImagekitOptions options)
    {
        _ImagekitClient = new ImagekitClient(options.PublicKey, options.PrivateKey, options.UrlEndPoint);
    }

    public async Task UploadOneAsync(IFormFile image, string path)
    {
        await _ImagekitClient.UploadAsync(new FileCreateRequest
        {
            folder = path,
            file = image
        });
    }
    // public async Task UploadManyAsync() {}

    public async Task DeleteAsync() { }
}