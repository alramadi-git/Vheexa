namespace DataAccess.Entities;

public class VehicleComment
{
    public uint ID;

    public Vehicle? Vehicle;
    public uint VehicleID;

    public Partner? Partner;
    public uint PartnerID;

    public VehicleRating? VehicleRating;
    public uint VehicleRatingID;

    public Comment? Comment;
    public uint CommentID;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}