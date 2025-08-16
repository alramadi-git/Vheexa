namespace DataAccess.Entities;

public class PartnerComment
{
    public uint ID;

    public User? User;
    public required uint UserID;

    public Partner? Partner;
    public required uint PartnerID;

    public PartnerRating? PartnerRating;
    public required uint PartnerRatingID;

    public Comment? Comment;
    public required uint CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}