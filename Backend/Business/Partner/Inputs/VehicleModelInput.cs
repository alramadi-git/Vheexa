using Microsoft.AspNetCore.Http;

namespace Business.Partner.Inputs;

public class ClsVehicleModelCreateInput
{
    public IFormFile? Thumbnail { get; set; }
    public required IFormFile[] Gallery { get; set; }
    public required string Name { get => field.Trim(); set; }
    public required string Description { get => field.Trim(); set; }
    public Database.Partner.Enums.CATEGORY Category { get; set; }
    public required string Manufacturer { get => field.Trim(); set; }
    public DateOnly MarketLaunch { get; set; }
    public int Capacity { get; set; }
    public required string Transmission { get => field.Trim(); set; }
    public required string Fuel { get => field.Trim(); set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public required string[] Tags { get => field.Select(tag => tag.Trim()).ToArray(); set; }
    public Database.Enums.STATUS Status { get; set; }
}

public class ClsVehicleModelFilterInput
{
    public class ClsMinMaxInput
    {
        public int? Min { get; set; }
        public int? Max { get; set; }
    }
    public class ClsMinMaxMonyInput
    {
        public decimal? Min { get; set; }
        public decimal? Max { get; set; }
    }
    public string? Search { get => field?.Trim(); set; }
    public required Database.Partner.Enums.CATEGORY[] Categories { get; set; }
    public required ClsMinMaxInput Capacity { get; set; }
    public required ClsMinMaxMonyInput Price { get; set; }
    public required ClsMinMaxMonyInput Discount { get; set; }
    public Database.Enums.STATUS? Status { get; set; }
}