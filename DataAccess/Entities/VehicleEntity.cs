namespace DataAccess.Entities;

public enum VEHICLE_CATEGORY_OPTION_ENTITY
{
    CAR,
    BUS,
    TRUCK,
    MOTORCYCLE,
    BICYCLE,
    BOAT,
    YACHT,
    HELICOPTER,
}

public class VehicleEntity
{
    public int ID { get; set; }

    public required string Name { get; set; }
    public required string Description { get; set; }

    public float AverageRates { get; set; }
     public VEHICLE_CATEGORY_OPTION_ENTITY Category { get; set; }

    public required string Manufacturer { get; set; }
    public DateOnly ManufacturingYear { get; set; }

    public short Capacity { get; set; }

    public required string[] Tags { get; set; }

    public float Price { get; set; }
    public float Discount { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}