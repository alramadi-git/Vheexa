namespace DataAccess.Entities;

public enum TASK_ACTION_OPTION_ENTITY
{
    CREATE,
    UPDATE,
    RESTORE,
    DELETE,
}

public enum TASK_TABLE_OPTION_ENTITY
{
    USERS,
    REQUESTS_TO_BE_A_PARTNER,
}

public class TaskEntity
{
    public int ID { get; set; }

    public TASK_ACTION_OPTION_ENTITY Action { get; set; }

    public TASK_TABLE_OPTION_ENTITY Table { get; set; }
    public int RowID { get; set; }
}

