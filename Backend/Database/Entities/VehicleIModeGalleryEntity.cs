namespace Database.Entities;

public class ClsVehicleModelGalleryEntity
{
    public Guid Guid { get; set; }
    public Guid VehicleModelUuid { get; set; }
    public ClsVehicleModelEntity VehicleModel { get; set; }
    public string ImageId { get; set; }
    public ClsImageEntity Image { get; set; }
    public int Index { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}