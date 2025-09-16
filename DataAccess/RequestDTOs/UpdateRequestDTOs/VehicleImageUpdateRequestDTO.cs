namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public class VehicleImageUpdateRequestDTO : ImageUpdateRequestDTO
{
    public required bool IsPublished { get; set; }
}