namespace DataAccess.Entities;

public class HumanEntity
{
    public int ID;

    public ImageEntity? Image;
    public int? ImageID;

    public AddressEntity? Address;
    public int AddressID;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}