namespace DataAccess.Entities;

public class VehicleComment
{
    public int ID;

    public Vehicle? Vehicle;
    public int VehicleID;

    public Partner? Partner;
    public int PartnerID;

    public VehicleRating? VehicleRating;
    public int VehicleRatingID;

    public Comment? Comment;
    public int CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}