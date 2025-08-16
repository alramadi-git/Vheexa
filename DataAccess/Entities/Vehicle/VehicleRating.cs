namespace DataAccess.Entities;

public class VehicleRating
{
    public uint ID;

    public User? User;
    public required uint UserID;

    public Vehicle? Vehicle;
    public required uint VehicleID;

    public Checkout? Checkout;
    public required uint CheckoutID;

    public Rating? Rating;
    public required uint RatingID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}