namespace Business.Partner.Filters;

public class ClsVehicleModelFilter
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