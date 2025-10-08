using DataAccess.Entities;
namespace DataAccess.User.DTOs.Responses;

public class VehicleColorDTO
{
    public Guid UUID { get; set; }

    public string Name { get; set; }
    public string HexCode { get; set; }

    public VehicleColorDTO(VehicleColorEntity vehicleColorEntity)
    {
        UUID = vehicleColorEntity.UUID;

        Name = vehicleColorEntity.Name;
        HexCode = vehicleColorEntity.HexCode;
    }
}