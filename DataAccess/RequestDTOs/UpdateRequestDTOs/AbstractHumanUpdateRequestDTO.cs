namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public abstract class AbstractHumanUpdateRequestDTO
{
    public ImageUpdateRequestDTO? Image { get; set; }
    public required LocationUpdateRequestDTO Location { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
}
