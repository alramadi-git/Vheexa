namespace DataAccess.Entities;

public class RequestToBeAPartnerEntity
{
    public enum STATUS
    {
        ACCEPTED,
        PENDING,
        REJECTED
    }

    public int ID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public required STATUS Status;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}