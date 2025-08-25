namespace DataAccess.Entities;

public enum REQUEST_TO_BE_A_PARTNER_STATUS
{
    ACCEPTED,
    PENDING,
    REJECTED
}

public class RequestToBeAPartnerEntity
{
    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public REQUEST_TO_BE_A_PARTNER_STATUS Status { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}