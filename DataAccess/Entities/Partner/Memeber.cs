namespace DataAccess.Entities;

public class Member
{
    public int ID;

    public Partner? Partner;
    public int PartnerID;

    public Human? Human;
    public int HumanID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}