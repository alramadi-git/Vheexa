using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class VehicleColorEntityDTO
{
    public int ID { get; set; }

    public string Name { get; set; }
    public string HexCode { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }


    public VehicleColorEntityDTO(VehicleColorEntity vehicle)
    {
        ID = vehicle.ID;

        Name = vehicle.Name;
        HexCode = vehicle.HexCode;

        IsPublished = vehicle.IsPublished;

        IsDeleted = vehicle.IsDeleted;
        DeletedAt = vehicle.DeletedAt;
    }
}