namespace Database.Entities;

public class VehicleInstanceSupportedLocationEntity
{
    public Guid UUID { get; set; }
   
    public Guid VehicleInstanceUUID { get; set; }
    public VehicleInstanceEntity VehicleInstance { get; set; }

    public Guid BranchUUID { get; set; }
    public BranchEntity Branch { get; set; }

    public bool IsPickup { get; set; }
    public bool IsDropoff { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}