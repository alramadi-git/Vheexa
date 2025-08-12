namespace DataAccess.Entities;

public class User
{
    public required int ID;

    public Human? Human;
    public required int HumanID;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}