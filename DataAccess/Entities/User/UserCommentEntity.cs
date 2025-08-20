namespace DataAccess.Entities;

public class UserCommentEntity
{
    public int ID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public UserEntity? User;
    public int UserID;

    public UserRatingEntity? UserRating;
    public int UserRatingID;

    public CommentEntity? Comment;
    public int CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}