using DataAccess.Entities;

namespace DataAccess.RequestDTOs.UpdateRequestDTOs;



public class VehicleUpdateRequestDTO
{
    public ImageUpdateRequestDTO? Thumbnail { get; set; }
    public IEnumerable<VehicleImageUpdateRequestDTO>? Images { get; set; }

    public IEnumerable<VehicleInstanceUpdateRequestDTO>? Instances { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }

    public required VEHICLE_CATEGORY_OPTION_ENTITY Category { get; set; }

    public required string Manufacturer { get; set; }
    public required DateOnly ManufacturingYear { get; set; }

    public required short Capacity { get; set; }

    public required string[] Tags { get; set; }

    public required decimal Price { get; set; }
    public required float Discount { get; set; }
}