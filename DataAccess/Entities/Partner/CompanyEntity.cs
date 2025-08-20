namespace DataAccess.Entities;

public class CompanyEntity
{
    public int ID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public ImageEntity? Image;
    public int ImageID;

    public required string Name;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}