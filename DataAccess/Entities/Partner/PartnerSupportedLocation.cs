namespace DataAccess.Entities;

public class PartnerSupportedLocation
{

    public int ID;

    public Partner? Partner;
    public int PartnerID;

    public Address? Address;
    public int AddressID;

    public required bool IsPickup;
    public required bool IsDropoff;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}