namespace DataAccess.Entities;

public class Payment
{
    public uint ID;

    public User? User;
    public uint UserID;


    public required string StripePaymentIntentID;
    public required string Currency;
    public decimal Amount;

    public DateTime CreatedAt;
}