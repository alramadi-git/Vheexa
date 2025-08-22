namespace DataAccess.Entities;

public class PaymentEntity
{
    public int ID;

    public HumanEntity? User;
    public int UserID;


    public required string StripePaymentIntentID;
    public required string Currency;
    public required decimal Amount;

    public required DateTime CreatedAt;
}