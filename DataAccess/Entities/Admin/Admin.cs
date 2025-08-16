namespace DataAccess.Entities;

public class Admin
{
    public uint ID;

    public Human? Human;
    public required uint HumanID;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}