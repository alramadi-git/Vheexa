namespace DataAccess.Entities;

public class Admin
{
    public required int ID;

    public required Human Human;
    public required int HumanID;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}