namespace DataAccess.Entities;

public class Task
{
    public enum ACTION
    {
        CREATE,
        UPDATE,
        DELETE,
    }

    public uint ID;

    public ACTION Action;

    public uint EntityID;
    public required string EntityName;
}