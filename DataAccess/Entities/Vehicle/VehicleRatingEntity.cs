namespace DataAccess.Entities;

public class VehicleRatingEntity
{
    public int ID;

    public UserEntity? User;
    public int UserID;

    public VehicleEntity? Vehicle;
    public int VehicleID;

    public CheckoutEntity? Checkout;
    public int CheckoutID;

    public RatingEntity? Rating;
    public int RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}