namespace DataAccess.Entities;

public class AdminEntity
{
    public int ID;

    public HumanEntity? Human;
    public int HumanID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}