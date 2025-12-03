using Database.Entities;

namespace Database.DTOs.User;

public class VehicleModelDTO
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
    public VehicleModelEntity.TRANSMISSION_MODEL Transmission { get; set; }
    public short Capacity { get; set; }
    public VehicleModelEntity.FUEL_MODEL Fuel { get; set; }
    public double Price { get; set; }
    public float Discount { get; set; }
    public string[] Tags { get; set; }
    public VehicleModelEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public VehicleModelDTO(VehicleModelEntity vehicleModel, ImageEntity[] images, VehicleColorEntity[] colors)
    {
        UUID = vehicleModel.UUID;
        Partner = new PartnerDTO(vehicleModel.Partner);
        Thumbnail = vehicleModel.Thumbnail == null
        ? null
        : new ImageDTO(vehicleModel.Thumbnail);
        Images = images.Select(image => new ImageDTO(image)).ToArray();
        Colors = colors.Select(vehicleColor => new VehicleColorDTO(vehicleColor)).ToArray();
        Name = vehicleModel.Name;
        Description = vehicleModel.Description;
        Manufacturer = vehicleModel.Manufacturer;
        ModelYear = vehicleModel.ModelYear;
        Transmission = vehicleModel.Transmission;
        Capacity = vehicleModel.Capacity;
        Fuel = vehicleModel.Fuel;
        Price = vehicleModel.Price;
        Discount = vehicleModel.Discount;
        Tags = vehicleModel.Tags;
        UpdatedAt = vehicleModel.UpdatedAt;
        CreatedAt = vehicleModel.CreatedAt;
    }
}