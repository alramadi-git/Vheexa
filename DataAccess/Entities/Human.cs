namespace DataAccess.Entities;

public class Human
{
    public required int ID;
    public required Image Image;
    public required int ImageID;

    public required Address Address;
    public required int AddressID;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}