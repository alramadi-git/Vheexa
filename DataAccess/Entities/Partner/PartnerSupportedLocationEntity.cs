namespace DataAccess.Entities;

public class PartnerSupportedLocationEntity
{

    public int ID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public AddressEntity? Address;
    public int AddressID;

    public required bool IsPickup;
    public required bool IsDropoff;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}