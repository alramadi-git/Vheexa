namespace DataAccess.Entities;

public class PartnerCommentEntity
{
    public int ID;

    public HumanEntity? User;
    public int UserID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public PartnerRatingEntity? PartnerRating;
    public int PartnerRatingID;

    public CommentEntity? Comment;
    public int CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}