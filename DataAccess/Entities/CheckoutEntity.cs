namespace DataAccess.Entities;

public class CheckoutEntity
{
    public enum STATUS
    {
        ACCEPTED,
        REFUNDED,
        REJECTED,
        CANCELLED
    }

    public int ID;

    public PaymentEntity? Payment;
    public int PaymentID;

    public DiscountEntity? Discount;
    public int? DiscountID;

    public required STATUS Status;
    public required int InUse;

    public required DateTime CreatedAt;
}