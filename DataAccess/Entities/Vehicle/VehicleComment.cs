namespace DataAccess.Entities;

public class VehicleComment
{
    public uint ID;

    public Vehicle? Vehicle;
    public required uint VehicleID;

    public Partner? Partner;
    public required uint PartnerID;

    public VehicleRating? VehicleRating;
    public required uint VehicleRatingID;

    public Comment? Comment;
    public required uint CommentID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}