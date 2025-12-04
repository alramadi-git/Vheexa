using Database.Entities;

namespace Database.DTOs.Generals;

public class ClsImageDTO
{
    public Guid UUID { get; set; }
    public string URL { get; set; }

    public ClsImageDTO(ImageEntity imageEntity)
    {
        UUID = imageEntity.UUID;
        URL = imageEntity.URL;
    }
}