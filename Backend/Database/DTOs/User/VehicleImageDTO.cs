using Database.Entities;

namespace Database.DTOs;

public class VehicleImageDTO
{
    public Guid UUID { get; set; }
    public ImageDTO Image { get; set; }
    public int Index { get; set; }

    public VehicleImageDTO(VehicleImageEntity vehicleImage)
    {
        UUID = vehicleImage.UUID;
        Image = new ImageDTO(vehicleImage.Image);
        Index = vehicleImage.Index;
    }
}