using DataAccess.Entities;

namespace DataAccess.Repositories.Modules.DTOs;

public class ImageDTO
{
    public int ID { get; set; }

    public string URL { get; set; }
    public string Alternate { get; set; }

    public ImageDTO(ImageEntity image)
    {
        ID = image.ID;
     
        URL = image.URL;
        Alternate = image.Alternate;
    }
}