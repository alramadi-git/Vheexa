namespace DataAccess.Entities;

public class PartnerSupportedLocation
{

    public uint ID;

    public Partner? Partner;
    public uint PartnerID;

    public Address? Address;
    public uint AddressID;

    public bool IsPickup;
    public bool IsDropoff;

    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}