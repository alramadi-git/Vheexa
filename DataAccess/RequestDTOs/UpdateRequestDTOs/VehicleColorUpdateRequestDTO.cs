namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public class VehicleColorUpdateRequestDTO
{
    public required ColorUpdateRequestDTO Color { get; set; }

    public int InStock { get; set; }
    public int InUse { get; set; }
};