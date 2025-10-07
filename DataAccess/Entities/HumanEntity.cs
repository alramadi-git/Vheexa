namespace DataAccess.Entities;

public class HumanEntity
{
    public string UUID { get; set; }

    public ImageEntity? Avatar { get; set; }
    public int? AvatarUUID { get; set; }

    public LocationEntity Location { get; set; }
    public int LocationID { get; set; }

    public string FirstName { get; set; }
    public string MidName { get; set; }
    public string LastName { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }
}