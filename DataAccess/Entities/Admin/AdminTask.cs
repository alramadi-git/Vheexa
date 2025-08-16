namespace DataAccess.Entities;

public class AdminTask
{
    public uint ID;

    public Admin? Admin;
    public required uint AdminID;

    public Task? Task;
    public required uint TaskID;

    public required DateTime CreatedAt;
}