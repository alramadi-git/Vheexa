using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class VehicleInstanceEntityDTO
{
    public int ID { get; set; }
    public ColorEntityDTO Color { get; set; }

    public int InStock { get; set; }
    public int InUse { get; set; }


    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }


    public VehicleInstanceEntityDTO(VehicleInstanceEntity vehicleInstance)
    {
        ID = vehicleInstance.ID;

        Color = new ColorEntityDTO(vehicleInstance.Color!);

        InStock = vehicleInstance.InStock;
        InUse = vehicleInstance.InUse;

        IsPublished = vehicleInstance.IsPublished;

        IsDeleted = vehicleInstance.IsDeleted;
        DeletedAt = vehicleInstance.DeletedAt;

        UpdatedAt = vehicleInstance.UpdatedAt;
        CreatedAt = vehicleInstance.CreatedAt;
    }
}
