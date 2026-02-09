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
    public required CATEGORY[] Categories { get; set; }
    public required ClsMinMaxInput Capacity { get; set; }
    public required ClsMinMaxMoneyInput Price { get; set; }
    public required ClsMinMaxMoneyInput Discount { get; set; }
    public STATUS? Status { get; set; }
}