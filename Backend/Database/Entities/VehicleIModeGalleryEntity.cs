namespace Database.Entities;

public class VehicleModelGalleryEntity
{
    public Guid UUID { get; set; }
    public Guid VehicleModelUUID { get; set; }
    public VehicleModelEntity VehicleModel { get; set; }
    public string Url { get; set; }
    public int Index { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}