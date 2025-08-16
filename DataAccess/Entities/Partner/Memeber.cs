namespace DataAccess.Entities;

public class Member
{
    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public Human? Human;
    public required uint HumanID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}