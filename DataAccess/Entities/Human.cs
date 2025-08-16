namespace DataAccess.Entities;

public class Human
{
    public uint ID;

    public Image? Image;
    public uint? ImageID;

    public Address? Address;
    public required uint AddressID;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}