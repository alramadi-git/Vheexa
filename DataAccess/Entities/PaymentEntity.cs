namespace DataAccess.Entities;

public class PaymentEntity
{
    public int ID { get; set; }

    public HumanEntity? User { get; set; }
    public int UserID { get; set; }


    public required string StripePaymentIntentID { get; set; }
    public required string Currency { get; set; }
    public decimal Amount { get; set; }

    public DateTime CreatedAt { get; set; }
}