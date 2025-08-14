namespace DataAccess.Entities;

public class Member
{
    public uint ID;

    public Partner? Partner;
    public uint PartnerID;

    public Human? Human;
    public uint HumanID;

    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}