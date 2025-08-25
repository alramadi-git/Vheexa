using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class ImageEntityDTO
{
    public int ID { get; set; }

    public string URL { get; set; }
    public string Alternate { get; set; }

    public ImageEntityDTO(ImageEntity image)
    {
        ID = image.ID;
     
        URL = image.URL;
        Alternate = image.Alternate;
    }
}