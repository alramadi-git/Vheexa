namespace DataAccess.Entities;

public class UserComment
{
    public required int ID;

    public required Rating Rating;
    public required int RatingID;

    public required Comment Comment;
    public required int CommentID;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}