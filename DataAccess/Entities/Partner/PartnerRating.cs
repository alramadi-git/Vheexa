namespace DataAccess.Entities;

public class PartnerRating
{
    public uint ID;

    public User? User;
    public uint UserID;

    public Partner? Partner;
    public uint PartnerID;

    public Rating? Rating;
    public uint RatingID;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}