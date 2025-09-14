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
    public int? ThumbnailID { get; set; }

    public required string Name { get; set; }
    public required string Description { get; set; }

    public required VEHICLE_CATEGORY_OPTION_ENTITY Category { get; set; }
    
    public required string Manufacturer { get; set; }
    public required DateOnly ManufacturingYear { get; set; }

    public required short Capacity { get; set; }

    public required string[] Tags { get; set; }

    public required decimal Price { get; set; }
    public required float Discount { get; set; }

    public required bool IsPublished { get; set; }

    public required bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public required DateTime UpdatedAt { get; set; }
    public required DateTime CreatedAt { get; set; }
}