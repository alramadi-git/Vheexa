using Database.Entities;

namespace Database.DTOs.User;

public class ClsVehicleColorDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public string HexCode { get; set; }

    public ClsVehicleColorDTO(VehicleModelColorEntity vehicleColor)
    {
        UUID = vehicleColor.UUID;
        Name = vehicleColor.Name;
        HexCode = vehicleColor.HexCode;
    }
}