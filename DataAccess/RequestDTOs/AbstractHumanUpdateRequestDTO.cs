namespace DataAccess.RequestDTOs;

public abstract class AbstractHumanUpdateRequestDTO
{
    public ImageUpdateRequestDTO? Image { get; set; }
    public required AddressUpdateRequestDTO Address { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public required DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
}
