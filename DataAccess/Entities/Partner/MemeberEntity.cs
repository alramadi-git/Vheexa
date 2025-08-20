namespace DataAccess.Entities;

public class MemberEntity
{
    public int ID;

    public PartnerEntity? Partner;
    public int PartnerID;

    public HumanEntity? Human;
    public int HumanID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}