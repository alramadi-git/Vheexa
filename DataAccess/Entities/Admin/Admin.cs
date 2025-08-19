namespace DataAccess.Entities;

public class Admin
{
    public int ID;

    public Human? Human;
    public int HumanID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}