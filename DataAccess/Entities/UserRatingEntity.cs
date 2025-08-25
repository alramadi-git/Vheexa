namespace DataAccess.Entities;

public class UserRatingEntity
{
    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public UserEntity? User { get; set; }
    public int UserID { get; set; }

    public RatingEntity? Rating { get; set; }
    public int RatingID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}