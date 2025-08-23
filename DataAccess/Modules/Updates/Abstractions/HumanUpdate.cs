namespace DataAccess.Modules.Updates.Abstractions;

public abstract class HumanUpdate
{
    public ImageUpdate? Image { get; set; }
    public required AddressUpdate Address { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public required DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
}
