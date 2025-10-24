using Database.Entities;

namespace Database.User.DTOs;

public class VehicleDTO
{
    public Guid UUID { get; set; }

    public PartnerDTO Partner { get; set; }

    public ImageDTO? Thumbnail { get; set; }
    public ImageDTO[] Images { get; set; }

    public VehicleColorDTO[] Colors { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public string Manufacturer { get; set; }
    public DateOnly ModelYear { get; set; }

    public string Transmission { get; set; }
    public string Fuel { get; set; }
    public short Capacity { get; set; }

    public double Price { get; set; }
    public float Discount { get; set; }

    public string[] Tags { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public VehicleDTO(VehicleEntity vehicleEntity, ImageEntity[] images, VehicleColorEntity[] colors)
    {
        UUID = vehicleEntity.UUID;

        Partner = new PartnerDTO(vehicleEntity.Partner);

        Thumbnail = vehicleEntity.Thumbnail == null
        ? null
        : new ImageDTO(vehicleEntity.Thumbnail);
        Images = images.Select(image => new ImageDTO(image)).ToArray();

        Colors = colors.Select(vehicleColor => new VehicleColorDTO(vehicleColor)).ToArray();

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