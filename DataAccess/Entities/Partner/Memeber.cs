namespace DataAccess.Entities;

public class Member
{
    public required int ID;

    public Partner? Partner;
    public required int PartnerID;

    public Human? Human;
    public required int HumanID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}