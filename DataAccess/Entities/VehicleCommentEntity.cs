namespace DataAccess.Entities;

public class VehicleCommentEntity
{
    public int ID { get; set; }

    public VehicleEntity? Vehicle { get; set; }
    public int VehicleID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public VehicleRatingEntity? VehicleRating { get; set; }
    public int VehicleRatingID { get; set; }

    public CommentEntity? Comment { get; set; }
    public int CommentID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}