using Database.Inputs;

using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Inputs;

public class ClsVehicleModelInput
{
    public Guid Uuid { get; set; }
    public ClsImageInput? Thumbnail { get; set; }
    public required ClsImageInput[] Gallery { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public CATEGORY Category { get; set; }
    public required string Manufacturer { get; set; }
    public DateOnly MarketLaunch { get; set; }
    public int Capacity { get; set; }
    public required string Transmission { get; set; }
    public required string Fuel { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public required string[] Tags { get; set; }
    public STATUS Status { get; set; }
}
