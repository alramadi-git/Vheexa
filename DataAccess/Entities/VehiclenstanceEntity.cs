namespace DataAccess.Entities;

public class VehicleInstanceEntity
{
    public Guid UUID { get; set; }

    public VehicleEntity Vehicle { get; set; }
    public Guid VehicleUUID { get; set; }

    public VehicleColorEntity VehicleColor { get; set; }
    public Guid VehicleColorUUID { get; set; }

    public string Plate { get; set; }

    public string Status { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}