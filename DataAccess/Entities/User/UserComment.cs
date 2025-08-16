namespace DataAccess.Entities;

public class UserComment
{
    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public User? User;
    public required uint UserID;

    public UserRating? UserRating;
    public required uint UserRatingID;

    public Comment? Comment;
    public required uint CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}