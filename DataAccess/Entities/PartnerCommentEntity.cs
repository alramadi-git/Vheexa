namespace DataAccess.Entities;

public class PartnerCommentEntity
{
    public int ID { get; set; }

    public HumanEntity? User { get; set; }
    public int UserID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public PartnerRatingEntity? PartnerRating { get; set; }
    public int PartnerRatingID { get; set; }

    public CommentEntity? Comment { get; set; }
    public int CommentID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}