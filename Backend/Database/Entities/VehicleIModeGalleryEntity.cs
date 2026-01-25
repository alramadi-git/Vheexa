namespace Database.Entities;

public class ClsVehicleModelGalleryEntity
{
    public Guid Uuid { get; set; }
    public Guid VehicleModelUuid { get; set; }
    public ClsVehicleModelEntity VehicleModel { get; set; }
    public string Url { get; set; }
    public int Index { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}