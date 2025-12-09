namespace Database.Entities;


public class VehicleInstanceEntity
{
    public enum STATUS
    {
        AVAILABLE,
        UNAVAILABLE
    }
    public Guid UUID { get; set; }
    public Guid VehicleModelUUID { get; set; }
    public VehicleModelEntity VehicleModel { get; set; }
    public Guid BranchUUID { get; set; }
    public BranchEntity Branch { get; set; }
    public Guid VehicleColorUUID { get; set; }
    public VehicleModelColorEntity VehicleColor { get; set; }
    public string Plate { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}