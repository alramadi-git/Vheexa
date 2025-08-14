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
    public uint PartnerID;

    public STATUS Status;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}