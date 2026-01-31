using Database.Enums;
using Database.Partner.Enums;

namespace Database.Entities;

public class ClsVehicleModelEntity
{
    public Guid Uuid { get; set; }
    public Guid PartnerUuid { get; set; }
    public ClsPartnerEntity Partner { get; set; }
    public string? Thumbnail { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public CATEGORY Category { get; set; }
    public string Manufacturer { get; set; }
    public DateOnly MarketLaunch { get; set; }
    public int Capacity { get; set; }
    public string Transmission { get; set; }
    public string Fuel { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public string Tags { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}