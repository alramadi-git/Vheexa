namespace DataAccess.RequestDTOs.CreateRequestDTOs;

public class PartnerCreateRequestDTO
{
    public ImageCreateRequestDTO? Image { get; set; }

    public required string Handle { get; set; }

    public required string Name { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
    public required string Password { get; set; }
}