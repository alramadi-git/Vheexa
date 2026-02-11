namespace Business.Partner.Filters;

public class ClsVehicleModelFilter
{
    public class ClsMinMaxInput
    {
        public int? Min { get; set; }
        public int? Max { get; set; }
    }
    public class ClsMinMaxMoneyInput
    {
        public decimal? Min { get; set; }
        public decimal? Max { get; set; }
    }
    public string? Search { get => field?.Trim(); set; }
    public Database.Partner.Enums.VEHICLE_MODEL_CATEGORY[] Categories { get; set; } = [];
    public ClsMinMaxInput Capacity { get; set; } = new ClsMinMaxInput
    {
        Min = null,
        Max = null
    };
    public ClsMinMaxMoneyInput Price { get; set; } = new ClsMinMaxMoneyInput
    {
        Min = null,
        Max = null
    };
    public ClsMinMaxMoneyInput Discount { get; set; } = new ClsMinMaxMoneyInput
    {
        Min = null,
        Max = null
    };
    public Database.Enums.STATUS? Status { get; set; }
}