using DataAccess.Entities;
namespace DataAccess.User.DTOs.Responses;

public class VehicleImageDTO
{
    public Guid UUID { get; set; }
    public string URL { get; set; }

    public VehicleImageDTO(VehicleImageEntity vehicleImageEntity)
    {
        UUID = vehicleImageEntity.UUID;
        URL = vehicleImageEntity.Image.URL;
    }
}