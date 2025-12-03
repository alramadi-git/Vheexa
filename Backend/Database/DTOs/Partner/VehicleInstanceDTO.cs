using Database.Entities;

namespace Database.DTOs.Partner;

public class VehicleInstanceDTO
{
    public Guid UUID { get; set; }
    public VehicleModelDTO VehicleModel { get; set; }
    public VehicleInstanceEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public VehicleInstanceDTO(VehicleInstanceEntity vehicleInstance)
    {
        UUID = vehicleInstance.UUID;

        UpdatedAt = vehicleInstance.UpdatedAt;
        CreatedAt = vehicleInstance.CreatedAt;
    }
}