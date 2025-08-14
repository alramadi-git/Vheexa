namespace DataAccess.Entities;

public class AdminTask
{
    public uint ID;

    public Admin? Admin;
    public uint AdminID;

    public Task? Task;
    public uint TaskID;

    public DateTime CreatedAt;
}