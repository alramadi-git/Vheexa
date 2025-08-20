namespace DataAccess.Entities;

public class UserRatingEntity
{
    public int ID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public UserEntity? User;
    public int UserID;

    public RatingEntity? Rating;
    public int RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}