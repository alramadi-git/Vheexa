namespace DataAccess.Entities;

public class VehicleColorEntity
{
    public int ID { get; set; }

    public VehicleEntity? Vehicle { get; set; }
    public int VehicleID { get; set; }

    public required string Name { get; set; }
    public required string HexCode { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}