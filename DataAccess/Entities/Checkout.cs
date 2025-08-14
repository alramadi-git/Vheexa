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
    public uint PaymentID;

    public Discount? Discount;
    public uint DiscountID;

    public STATUS Status;
    public uint InUse;

    public DateTime CreatedAt;
}