using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Parameters;

public class ClsVehicleModelCreateParameter
{

    public string Thumbnail { get; set; }
    public string[] Gallery { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public VehicleModelCATEGORY Category { get; set; }
    public string Manufacturer { get; set; }
    public DateOnly MarketLaunch { get; set; }
    public int Capacity { get; set; }
    public string Transmission { get; set; }
    public string Fuel { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public string[] Tags { get; set; }
    public STATUS Status { get; set; }
}

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
    public string[] Manufacturers { get; set; }
    public ClsMinMax Capacity { get; set; }
    public string[] Transmissions { get; set; }
    public string[] Fuels { get; set; }
    public ClsMinMaxMoney Price { get; set; }
    public ClsMinMaxMoney Discount { get; set; }
    public STATUS? Status { get; set; }
}