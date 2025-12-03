namespace Database.Entities;

public class VehicleModelEntity
{
    public enum TRANSMISSION_MODEL
    {
        MANUAL,
        AUTOMATIC,
        SEMI_AUTOMATIC,
        CVT,
        DUAL_CLUTCH,
    }
    public enum FUEL_MODEL
    {
        PETROL91,
        PETROL95,
        PETROL98,
        DIESEL,
        ELECTRIC,
        HYBRID,
        CNG,
        LPG,
        HYDROGEN,
    }
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public Guid UUID { get; set; }
    public Guid PartnerUUID { get; set; }
    public PartnerEntity Partner { get; set; }
    public Guid? ThumbnailUUID { get; set; }
    public ImageEntity? Thumbnail { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Manufacturer { get; set; }
    public DateOnly ModelYear { get; set; }
    public TRANSMISSION_MODEL Transmission { get; set; }
    public short Capacity { get; set; }
    public FUEL_MODEL Fuel { get; set; }
    public double Price { get; set; }
    public float Discount { get; set; }
    public string[] Tags { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}