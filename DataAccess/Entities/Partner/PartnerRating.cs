namespace DataAccess.Entities;

public class PartnerRating
{
    public int ID;

    public User? User;
    public int UserID;

    public Partner? Partner;
    public int PartnerID;

    public Rating? Rating;
    public int RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}