namespace DataAccess.Entities;

public class PartnerSupportedLocation
{

    public required int ID;

    public Partner? Partner;
    public required int PartnerID;

    public Address? Address;
    public required int AddressID;

    public required bool IsPickup;
    public required bool IsDropoff;
    
    public required bool IsPublished;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}