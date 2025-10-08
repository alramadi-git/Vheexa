using DataAccess.Entities;
namespace DataAccess.User.DTOs.Responses;

public class VehicleDTO
{
    public Guid UUID { get; set; }

    public PartnerDTO Partner { get; set; }

    public ImageDTO? Thumbnail { get; set; }
    public IEnumerable<VehicleImageDTO> Images { get; set; }

    public IEnumerable<VehicleColorDTO> Colors { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public string Manufacturer { get; set; }
    public DateOnly ModelYear { get; set; }

    public string Transmission { get; set; }
    public short Capacity { get; set; }
    public string Fuel { get; set; }

    public double Price { get; set; }
    public float Discount { get; set; }

    public IEnumerable<string> Tags { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public VehicleDTO(VehicleEntity vehicleEntity, IEnumerable<VehicleImageEntity> images, IEnumerable<VehicleColorEntity> colors)
    {
        UUID = vehicleEntity.UUID;

        Partner = new PartnerDTO(vehicleEntity.Partner);

        Thumbnail = vehicleEntity.Thumbnail == null
        ? null
        : new ImageDTO(vehicleEntity.Thumbnail);
        Images = images.Select(image => new VehicleImageDTO(image));

        Colors = colors.Select(vehicleColor => new VehicleColorDTO(vehicleColor));

        Name = vehicleEntity.Name;
        Description = vehicleEntity.Description;

        Manufacturer = vehicleEntity.Manufacturer;
        ModelYear = vehicleEntity.ModelYear;

        Transmission = vehicleEntity.Transmission;
        Capacity = vehicleEntity.Capacity;
        Fuel = vehicleEntity.Fuel;

        Price = vehicleEntity.Price;
        Discount = vehicleEntity.Discount;

        Tags = vehicleEntity.Tags;

        UpdatedAt = vehicleEntity.UpdatedAt;
        CreatedAt = vehicleEntity.CreatedAt;
    }
}