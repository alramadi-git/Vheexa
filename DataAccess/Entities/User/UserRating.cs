namespace DataAccess.Entities;

public class UserRating
{
    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public User? User;
    public required uint UserID;

    public Rating? Rating;
    public required uint RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}