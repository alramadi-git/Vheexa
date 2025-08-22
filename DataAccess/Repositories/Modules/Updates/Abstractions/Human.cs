namespace DataAccess.Repositories.Modules.Updates.Abstractions;

public abstract class Human
{
    public Image? Image { get; set; }
    public required Address Address { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public required DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
}
