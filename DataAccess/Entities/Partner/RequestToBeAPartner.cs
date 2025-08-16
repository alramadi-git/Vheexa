namespace DataAccess.Entities;

public class RequestToBeAPartner
{
    public enum STATUS
    {
        ACCEPTED,
        PENDING,
        REJECTED
    }

    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public required STATUS Status;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}