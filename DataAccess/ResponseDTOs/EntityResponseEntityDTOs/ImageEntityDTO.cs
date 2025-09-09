using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class ImageEntityDTO
{
    public int ID { get; set; }

    public string URL { get; set; }

    public ImageEntityDTO(ImageEntity image)
    {
        ID = image.ID;
     
        URL = image.URL;
    }
}