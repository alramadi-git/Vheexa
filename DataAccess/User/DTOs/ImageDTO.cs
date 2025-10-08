using DataAccess.Entities;
namespace DataAccess.User.DTOs;

public class ImageDTO
{
    public string UUID { get; set; }
    public string URL { get; set; }

    public ImageDTO(ImageEntity imageEntity)
    {
        this.UUID = imageEntity.UUID;
        this.URL = imageEntity.URL;
    }
}