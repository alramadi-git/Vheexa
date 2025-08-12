namespace DataAccess.Entities;

public class RequestToBeAPartner
{
    public enum STATUS
    {
        ACCEPTED,
        PENDING,
        REJECTED
    }

    public required int ID;

    public Partner? Partner;
    public required int PartnerID;

    public required STATUS Status;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}