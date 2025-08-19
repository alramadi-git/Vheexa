namespace DataAccess.Entities;

public class PartnerComment
{
    public int ID;

    public User? User;
    public int UserID;

    public Partner? Partner;
    public int PartnerID;

    public PartnerRating? PartnerRating;
    public int PartnerRatingID;

    public Comment? Comment;
    public int CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}