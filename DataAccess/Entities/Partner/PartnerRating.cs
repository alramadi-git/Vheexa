namespace DataAccess.Entities;

public class PartnerRating
{
    public required int ID;

    public User? User;
    public required int UserID;

    public Partner? Partner;
    public required int PartnerID;

    public Rating? Rating;
    public required int RatingID;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}