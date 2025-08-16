namespace DataAccess.Entities;

public class Task
{
    public enum ACTION
    {
        CREATE,
        UPDATE,
        DELETE,
    }

    public required uint ID;

    public required ACTION Action;

    public required uint EntityID;
    public required string EntityName;
}

