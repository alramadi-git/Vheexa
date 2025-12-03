namespace Database.Entities;

public class VehicleImageEntity
{
    public Guid UUID { get; set; }
    public Guid VehicleModelUUID { get; set; }
    public VehicleModelEntity VehicleModel { get; set; }
    public Guid ImageUUID { get; set; }
    public ImageEntity Image { get; set; }
    public int Index { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}