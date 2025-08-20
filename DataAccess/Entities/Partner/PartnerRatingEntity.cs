namespace DataAccess.Entities;

public class PartnerRatingEntity
{
    public int ID;

    public UserEntity? User;
    public int UserID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public RatingEntity? Rating;
    public int RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}