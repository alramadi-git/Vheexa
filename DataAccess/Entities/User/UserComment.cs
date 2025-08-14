namespace DataAccess.Entities;

public class UserComment
{
    public uint ID;

    public Partner? Partner;
    public uint PartnerID;

    public User? User;
    public uint UserID;

    public UserRating? UserRating;
    public uint UserRatingID;

    public Comment? Comment;
    public uint CommentID;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}