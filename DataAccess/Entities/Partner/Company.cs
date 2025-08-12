namespace DataAccess.Entities;

public class Company
{
    public required int ID;

    public Partner? Partner;
    public required int PartnerID;

    public Image? Image;
    public required int ImageID;

    public required string Name;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}