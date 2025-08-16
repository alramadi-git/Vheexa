namespace DataAccess.Entities;

public class PartnerSupportedLocation
{

    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public Address? Address;
    public required uint AddressID;

    public required bool IsPickup;
    public required bool IsDropoff;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}