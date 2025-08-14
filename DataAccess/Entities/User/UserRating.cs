namespace DataAccess.Entities;

public class UserRating
{
    public uint ID;

    public Partner? Partner;
    public uint PartnerID;

    public User? User;
    public uint UserID;

    public Rating? Rating;
    public uint RatingID;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}