namespace DataAccess.Entities;

public class VehicleInstanceEntity
{
    public string UUID { get; set; }

    public VehicleEntity Vehicle { get; set; }
    public string VehicleUUID { get; set; }

    public VehicleColorEntity VehicleColor { get; set; }
    public string VehicleColorUUID { get; set; }

    public string Plate { get; set; }

    public string Status { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}