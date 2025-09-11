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
}

public class VehicleEntity
{
    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public ImageEntity? Thumbnail { get; set; }
    public int ThumbnailID { get; set; }

    public required string Name { get; set; }
    public required string Description { get; set; }

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