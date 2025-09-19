namespace DataAccess.RequestDTOs.CreateRequestDTOs;

public class VehicleColorCreateRequestDTO
{
    public required ColorCreateRequestDTO Color { get; set; }

    public int InStock { get; set; }
    public int InUse { get; set; }
};