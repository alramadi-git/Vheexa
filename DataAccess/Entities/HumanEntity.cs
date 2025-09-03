namespace DataAccess.Entities;

public class HumanEntity
{
    public int ID { get; set; }

    public ImageEntity? Image { get; set; }
    public int? ImageID { get; set; }

    public LocationEntity? Location { get; set; }
    public int AddressID { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
    public required string Password { get; set; }
}