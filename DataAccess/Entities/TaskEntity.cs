namespace DataAccess.Entities;

public enum TASK_ACTION_OPTION_ENTITY
{
    CREATE,
    UPDATE,
    DELETE,
}


public class TaskEntity
{
    public int ID { get; set; }

    public TASK_ACTION_OPTION_ENTITY Action { get; set; }

    public int EntityID { get; set; }
    public required string EntityName { get; set; }
}

