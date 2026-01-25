using Database.DTOs.Generals;
using Database.Entities;

namespace Database.DTOs.User;

public class ClsVehicleModelDTO
{
    public Guid UUID { get; set; }
    public ClsPartnerDTO Partner { get; set; }
    public ClsImageDTO? Thumbnail { get; set; }
    public ClsVehicleImageDTO[] Images { get; set; }
    public ClsVehicleColorDTO[] Colors { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Manufacturer { get; set; }
    public DateOnly ModelYear { get; set; }
    public ClsVehicleModelEntity.TRANSMISSION_MODEL Transmission { get; set; }
    public short Capacity { get; set; }
    public ClsVehicleModelEntity.FUEL_MODEL Fuel { get; set; }
    public double Price { get; set; }
    public float Discount { get; set; }
    public string[] Tags { get; set; }
    public ClsVehicleModelEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public ClsVehicleModelDTO(ClsVehicleModelEntity vehicleModel, ClsVehicleModelGalleryEntity[] images, VehicleModelColorEntity[] colors)
    {
        UUID = vehicleModel.Uuid;
        Partner = new ClsPartnerDTO(vehicleModel.Partner);
        Thumbnail = vehicleModel.Thumbnail == null
        ? null
        : new ClsImageDTO(vehicleModel.Thumbnail);
        Images = images.Select(image => new ClsVehicleImageDTO(image)).ToArray();
        Colors = colors.Select(vehicleColor => new ClsVehicleColorDTO(vehicleColor)).ToArray();
        Name = vehicleModel.Name;
        Description = vehicleModel.Description;
        Manufacturer = vehicleModel.Manufacturer;
        ModelYear = vehicleModel.MarketLaunch;
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