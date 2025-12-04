using Database.DTOs.Generals;
using Database.Entities;

namespace Database.DTOs.User;

public class ClsVehicleImageDTO
{
    public Guid UUID { get; set; }
    public ClsImageDTO Image { get; set; }
    public int Index { get; set; }

    public ClsVehicleImageDTO(VehicleImageEntity vehicleImage)
    {
        UUID = vehicleImage.UUID;
        Image = new ClsImageDTO(vehicleImage.Image);
        Index = vehicleImage.Index;
    }
}