using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Filters;

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
    public string? Search { get; set; }
    public VEHICLE_MODEL_CATEGORY[] Categories { get; set; } = [];
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
    public STATUS? Status { get; set; }
}