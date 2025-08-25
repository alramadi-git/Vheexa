namespace DataAccess.Entities;

public class VehicleInstanceEntity
{
    public int ID { get; set; }

    public VehicleEntity? Vehicle { get; set; }
    public int VehicleID { get; set; }

    public VehicleColorEntity? VehicleColor { get; set; }
    public int VehicleColorID { get; set; }

    public int InStock { get; set; }
    public int InUse { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}