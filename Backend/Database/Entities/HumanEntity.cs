namespace Database.Entities;

public class HumanEntity
{
    public Guid UUID { get; set; }

    public Guid? AvatarUUID { get; set; }
    public ImageEntity? Avatar { get; set; }

    public Guid LocationUUID { get; set; }
    public LocationEntity Location { get; set; }

    public string Username { get; set; }
    public DateOnly DateOfBirth { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }
}