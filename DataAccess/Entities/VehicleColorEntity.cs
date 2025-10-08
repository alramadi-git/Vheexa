namespace DataAccess.Entities;

public class VehicleColorEntity
{
    public string UUID { get; set; }

    public VehicleEntity Vehicle { get; set; }
    public string VehicleUUID { get; set; }

    public string Name { get; set; }
    public string HexCode { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}