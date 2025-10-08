using DataAccess.Entities;
namespace DataAccess.User.DTOs.Responses;

public class ImageDTO
{
    public Guid UUID { get; set; }
    public string URL { get; set; }

    public ImageDTO(ImageEntity imageEntity)
    {
        UUID = imageEntity.UUID;
        URL = imageEntity.URL;
    }
}