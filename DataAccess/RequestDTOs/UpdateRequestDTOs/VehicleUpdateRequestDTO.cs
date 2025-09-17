using DataAccess.Entities;

namespace DataAccess.RequestDTOs.UpdateRequestDTOs;



public class VehicleUpdateRequestDTO
{
    public ImageUpdateRequestDTO? Thumbnail { get; set; }
    public IEnumerable<VehicleImageUpdateRequestDTO>? Images { get; set; }

    public IEnumerable<VehicleInstanceUpdateRequestDTO>? Instances { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }

    public VEHICLE_CATEGORY_OPTION_ENTITY Category { get; set; }

    public required string Manufacturer { get; set; }
    public DateOnly ManufacturingYear { get; set; }

    public short Capacity { get; set; }

    public required string[] Tags { get; set; }

    public decimal Price { get; set; }
    public float Discount { get; set; }
}