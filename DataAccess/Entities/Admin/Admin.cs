namespace DataAccess.Entities;

public class Admin
{
    public uint ID;

    public Human? Human;
    public uint HumanID;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}