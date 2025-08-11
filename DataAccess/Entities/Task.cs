namespace DataAccess.Entities;

public enum ACTION
{
    CREATE,
    UPDATE,
    DELETE,
}


public class Task
{
    public required int ID;

    public required ACTION Action;
    
    public required int EntityID ;
    public required string EntityName;
}