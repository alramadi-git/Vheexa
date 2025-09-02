namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public class PartnerUpdateRequestDTO
{
    public ImageUpdateRequestDTO? Image { get; set; }

    public required string Handle { get; set; }

    public required string Name { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
}