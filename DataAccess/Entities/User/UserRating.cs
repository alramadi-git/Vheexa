namespace DataAccess.Entities;

public class UserRating
{
    public required int ID;

    public Partner? Partner;
    public required int PartnerID;

    public User? User;
    public required int UserID;

    public Rating? Rating;
    public required int RatingID;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}