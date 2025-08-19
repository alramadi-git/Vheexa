namespace DataAccess.Entities;

public class VehicleRating
{
    public int ID;

    public User? User;
    public int UserID;

    public Vehicle? Vehicle;
    public int VehicleID;

    public Checkout? Checkout;
    public int CheckoutID;

    public Rating? Rating;
    public int RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}