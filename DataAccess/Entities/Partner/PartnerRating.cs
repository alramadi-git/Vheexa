namespace DataAccess.Entities;

public class PartnerRating
{
    public uint ID;

    public User? User;
    public required uint UserID;

    public Partner? Partner;
    public required uint PartnerID;

    public Rating? Rating;
    public required uint RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}