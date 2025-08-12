namespace DataAccess.Entities;

public class PartnerComment
{
    public required int ID;

    public User? User;
    public required int UserID;

    public Partner? Partner;
    public required int PartnerID;

    public PartnerRating? PartnerRating;
    public required int PartnerRatingID;

    public Comment? Comment;
    public required int CommentID;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}