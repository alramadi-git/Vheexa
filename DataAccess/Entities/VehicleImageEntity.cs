namespace DataAccess.Entities;

public class VehicleImageEntity
{
    public int ID { get; set; }

    public VehicleEntity? Vehicle { get; set; }
    public int VehicleID { get; set; }

    public ImageEntity? Image { get; set; }
    public int ImageID { get; set; }

    public int Index { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}