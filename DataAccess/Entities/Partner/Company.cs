namespace DataAccess.Entities;

public class Company
{
    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public Image? Image;
    public uint ImageID;

    public required string Name;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}