namespace DataAccess.Entities;

public class Company
{
    public int ID;

    public Partner? Partner;
    public int PartnerID;

    public Image? Image;
    public int ImageID;

    public required string Name;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}