namespace DataAccess.Entities;

public class Task
{
    public enum ACTION
    {
        CREATE,
        UPDATE,
        DELETE,
    }

    public required int ID;

    public required ACTION Action;

    public required int EntityID;
    public required string EntityName;
}

