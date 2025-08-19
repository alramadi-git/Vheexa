namespace DataAccess.Entities;

public class MemberTask
{
    public int ID;

    public Member? Member;
    public int MemberID;

    public Task? Task;
    public int TaskID;

    public required DateTime CreatedAt;
}