using Database.DTOs.Generals;
using Database.DTOs.User;
using Database.Entities;

namespace Database.DTOs.Partner;

public class ClsVehicleModelDTO
{
    public Guid UUID { get; set; }
    public ClsImageDTO? Thumbnail { get; set; }
    public ClsImageDTO[] Images { get; set; }
    public ClsVehicleColorDTO[] Colors { get; set; }
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

    public ClsVehicleModelDTO(VehicleModelEntity vehicleModel, ImageEntity[] images, VehicleModelColorEntity[] colors)
    {
        UUID = vehicleModel.UUID;
        Thumbnail = vehicleModel.Thumbnail == null
        ? null
        : new ClsImageDTO(vehicleModel.Thumbnail);
        Images = [.. images.Select(image => new ClsImageDTO(image))];
        Colors = [.. colors.Select(vehicleColor => new ClsVehicleColorDTO(vehicleColor))];
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