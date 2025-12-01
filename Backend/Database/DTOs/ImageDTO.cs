using Database.Entities;

namespace Database.DTOs;

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