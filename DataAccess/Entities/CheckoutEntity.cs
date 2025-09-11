namespace DataAccess.Entities;

public enum CHECKOUT_STATUS_OPTION_ENTITY
{
    ACCEPTED,
    REJECTED,
}

public class CheckoutEntity
{
    public int ID { get; set; }

    public PaymentEntity? Payment { get; set; }
    public int PaymentID { get; set; }

    public DiscountEntity? Discount { get; set; }
    public int? DiscountID { get; set; }

    public CHECKOUT_STATUS_OPTION_ENTITY Status { get; set; }
    public int InUse { get; set; }

    public DateTime CreatedAt { get; set; }
}