using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class VehicleImageEntityDTO
{
    public int ID { get; set; }

    public ImageEntityDTO Image { get; set; }
    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }


    public VehicleImageEntityDTO(VehicleImageEntity vehicle)
    {
        ID = vehicle.ID;

        Image = new(vehicle.Image!);

        IsPublished = vehicle.IsPublished;

        IsDeleted = vehicle.IsDeleted;
        DeletedAt = vehicle.DeletedAt;
    }
}