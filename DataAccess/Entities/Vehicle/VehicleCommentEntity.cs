namespace DataAccess.Entities;

public class VehicleCommentEntity
{
    public int ID;

    public VehicleEntity? Vehicle;
    public int VehicleID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public VehicleRatingEntity? VehicleRating;
    public int VehicleRatingID;

    public CommentEntity? Comment;
    public int CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}