namespace DataAccess.RequestDTOs.UpdateRequestDTOs;


public class VehicleInstanceUpdateRequestDTO
{
    public int ID { get; set; }

    public required ColorUpdateRequestDTO Color { get; set; }

    public int InStock { get; set; }
    public int InUse { get; set; }
}