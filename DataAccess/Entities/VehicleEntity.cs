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
    public string UUID { get; set; }

    public PartnerEntity Partner { get; set; }
    public string PartnerUUID { get; set; }

    public ImageEntity? Thumbnail { get; set; }
    public string? ThumbnailUUID { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public string Manufacturer { get; set; }
    public DateOnly ManufacturingYear { get; set; }

    public string Transmission { get; set; }
    public short Capacity { get; set; }
    public string Fuel { get; set; }

    public decimal Price { get; set; }
    public float Discount { get; set; }

    public string[] Tags { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}