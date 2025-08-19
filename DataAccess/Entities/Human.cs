namespace DataAccess.Entities;

public class Human
{
    public int ID;

    public Image? Image;
    public int? ImageID;

    public Address? Address;
    public int AddressID;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}