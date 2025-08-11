namespace DataAccess.Entities;

public class AdminTask
{
    public required int ID;

    public required Admin Admin;
    public required int AdminID;

    public required Task Task;
    public required int TaskID;

    public required DateTime CreatedAt;
}