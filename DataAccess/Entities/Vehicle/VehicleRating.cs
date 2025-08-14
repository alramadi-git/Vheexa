namespace DataAccess.Entities;

public class VehicleRating
{
    public uint ID;

    public User? User;
    public uint UserID;

    public Vehicle? Vehicle;
    public uint VehicleID;

    public Checkout? Checkout;
    public uint CheckoutID;

    public Rating? Rating;
    public uint RatingID;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}