namespace DataAccess.Entities;

public class AdminTask
{
    public int ID;

    public Admin? Admin;
    public int AdminID;

    public Task? Task;
    public int TaskID;

    public required DateTime CreatedAt;
}