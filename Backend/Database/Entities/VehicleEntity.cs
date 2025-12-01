namespace Database.Entities;

public class VehicleEntity
{
    public Guid UUID { get; set; }

    public Guid PartnerUUID { get; set; }
    public PartnerEntity Partner { get; set; }

    public Guid? ThumbnailUUID { get; set; }
    public ImageEntity? Thumbnail { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public string Manufacturer { get; set; }
    public DateOnly ModelYear { get; set; }

    public string Transmission { get; set; }
    public short Capacity { get; set; }
    public string Fuel { get; set; }

    public double Price { get; set; }
    public float Discount { get; set; }

    public string[] Tags { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}