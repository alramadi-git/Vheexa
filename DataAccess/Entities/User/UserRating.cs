namespace DataAccess.Entities;

public class UserRating
{
    public int ID;

    public Partner? Partner;
    public int PartnerID;

    public User? User;
    public int UserID;

    public Rating? Rating;
    public int RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}