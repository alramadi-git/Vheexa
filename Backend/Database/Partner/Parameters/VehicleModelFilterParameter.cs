using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Parameters;

public class ClsVehicleModelFilterParameter
{
    public class ClsMinMax
    {
        public int? Min { get; set; }
        public int? Max { get; set; }
    }
    public class ClsMinMaxMoney
    {
        public decimal? Min { get; set; }
        public decimal? Max { get; set; }
    }
    public string? Search { get; set; }
    public VehicleModelCATEGORY[] Categories { get; set; }
    public ClsMinMax? Capacity { get; set; }
    public string[] Transmissions { get; set; }
    public string[] Fuels { get; set; }
    public ClsMinMaxMoney? Price { get; set; }
    public ClsMinMaxMoney? Discount { get; set; }
    public STATUS? Status { get; set; }
}