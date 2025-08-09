namespace DataAccess.Entities;

public class Checkout
{
    public required int ID;

    public Payment? Payment;
    public required int PaymentID;

    public Discount? Discount;
    public required int DiscountID;

    public required string Status;

    public required DateTime CreatedAt;
}