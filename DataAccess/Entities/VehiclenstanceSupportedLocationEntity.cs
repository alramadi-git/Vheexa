namespace DataAccess.Entities;

public class VehicleInstanceSupportedLocationEntity
{
    public string UUID { get; set; }

    public VehicleInstanceEntity VehicleInstance { get; set; }
    public string VehicleInstanceUUID { get; set; }

    public PartnerSupportedLocationEntity PartnerSupportedLocation { get; set; }
    public string PartnerSupportedLocationUUID { get; set; }

    public bool IsPickup { get; set; }
    public bool IsDropoff { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}