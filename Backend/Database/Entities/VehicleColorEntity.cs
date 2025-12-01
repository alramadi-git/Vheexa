namespace Database.Entities;

public class VehicleColorEntity
{
    public Guid UUID { get; set; }
    
    public Guid VehicleUUID { get; set; }
    public VehicleEntity Vehicle { get; set; }

    public string Name { get; set; }
    public string HexCode { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}