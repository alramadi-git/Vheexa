namespace DataAccess.Entities;

public class BeforeReturnImageEntity
{
    public int ID { get; set; }

    public RequestToReturnEntity? RequestToReturn { get; set; }
    public int RequestToReturnID { get; set; }

    public ImageEntity? Image { get; set; }
    public int ImageID { get; set; }

    public DateTime CreatedAt { get; set; }
}