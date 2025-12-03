namespace Database.Entities;

public class VehicleColorEntity
{
    public Guid UUID { get; set; }
    public Guid VehicleModelUUID { get; set; }
    public VehicleModelEntity VehicleModel { get; set; }
    public string Name { get; set; }
    public string HexCode { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}