namespace DataAccess.Entities;

public class UserComment
{
    public int ID;

    public Partner? Partner;
    public int PartnerID;

    public User? User;
    public int UserID;

    public UserRating? UserRating;
    public int UserRatingID;

    public Comment? Comment;
    public int CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}