using Database.Entities;

namespace Database.DTOs;

public class VehicleColorDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public string HexCode { get; set; }

    public VehicleColorDTO(VehicleColorEntity vehicleColor)
    {
        UUID = vehicleColor.UUID;
        Name = vehicleColor.Name;
        HexCode = vehicleColor.HexCode;
    }
}