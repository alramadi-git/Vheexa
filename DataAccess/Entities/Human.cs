namespace DataAccess.Entities;

public class Human
{
    public required int ID;

    public Image? Image;
    public required int ImageID;

    public required int AddressID;

    

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;

    public required bool IsPublished;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}