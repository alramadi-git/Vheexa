namespace DataAccess.Entities;

public class Checkout
{
    public enum STATUS
    {
        ACCEPTED,
        REFUNDED,
        REJECTED,
        CANCELLED
    }

    public int ID;

    public Payment? Payment;
    public int PaymentID;

    public Discount? Discount;
    public int? DiscountID;

    public required STATUS Status;
    public required int InUse;

    public required DateTime CreatedAt;
}