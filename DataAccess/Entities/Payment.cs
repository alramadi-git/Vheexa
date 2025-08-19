namespace DataAccess.Entities;

public class Payment
{
    public int ID;

    public User? User;
    public int UserID;


    public required string StripePaymentIntentID;
    public required string Currency;
    public required decimal Amount;

    public required DateTime CreatedAt;
}