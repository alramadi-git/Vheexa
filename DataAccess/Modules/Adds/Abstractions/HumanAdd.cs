namespace DataAccess.Modules.Adds.Abstractions;

public abstract class HumanAdd
{
    public ImageAdd? Image { get; set; }
    public required AddressAdd Address { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public required DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
    public required string Password { get; set; }
}
