namespace DataAccess.Entities;

public class AdminTaskEntity
{
    public int ID;

    public AdminEntity? Admin;
    public int AdminID;

    public TaskEntity? Task;
    public int TaskID;

    public required DateTime CreatedAt;
}