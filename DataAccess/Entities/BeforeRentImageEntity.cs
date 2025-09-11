namespace DataAccess.Entities;

public class BeforeRentImageEntity
{
    public int ID { get; set; }

    public RequestToRentEntity? RequestToRent { get; set; }
    public int RequestToRentID { get; set; }

    public ImageEntity? Image { get; set; }
    public int ImageID { get; set; }

    public DateTime CreatedAt { get; set; }
}