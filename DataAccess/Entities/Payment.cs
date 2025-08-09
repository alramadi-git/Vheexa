namespace DataAccess.Entities;

public class Payment
{
    public required int ID;

    public Human? Human;
    public required int HumanID;

    public required string StripePaymentIntentID;

    public required double Amount;
    public required string Currency;

    public required DateTime CreatedAt;
}