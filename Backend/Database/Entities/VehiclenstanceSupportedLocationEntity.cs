namespace Database.Entities;

public class VehicleInstanceSupportedLocationEntity
{
    public Guid UUID { get; set; }
   
    public VehicleInstanceEntity VehicleInstance { get; set; }
    public Guid VehicleInstanceUUID { get; set; }

    public PartnerSupportedLocationEntity PartnerSupportedLocation { get; set; }
    public Guid PartnerSupportedLocationUUID { get; set; }

    public bool IsPickup { get; set; }
    public bool IsDropoff { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}