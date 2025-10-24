namespace Database.Entities;

public class VehicleImageEntity
{
    public Guid UUID { get; set; }
   
    public VehicleEntity Vehicle { get; set; }
    public Guid VehicleUUID { get; set; }

    public ImageEntity Image { get; set; }
    public Guid ImageUUID { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}