namespace DataAccess.Entities;

public class VehicleRatingEntity
{
    public int ID { get; set; }

    public HumanEntity? User { get; set; }
    public int UserID { get; set; }

    public VehicleEntity? Vehicle { get; set; }
    public int VehicleID { get; set; }

    public CheckoutEntity? Checkout { get; set; }
    public int CheckoutID { get; set; }

    public RatingEntity? Rating { get; set; }
    public int RatingID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}