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

    public uint ID;

    public Payment? Payment;
    public required uint PaymentID;

    public Discount? Discount;
    public uint? DiscountID;

    public required STATUS Status;
    public required uint InUse;

    public required DateTime CreatedAt;
}