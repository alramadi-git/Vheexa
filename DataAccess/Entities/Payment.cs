namespace DataAccess.Entities;

public class Payment
{
    public uint ID;

    public User? User;
    public required uint UserID;


    public required string StripePaymentIntentID;
    public required string Currency;
    public required decimal Amount;

    public required DateTime CreatedAt;
}