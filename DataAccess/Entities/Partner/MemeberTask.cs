namespace DataAccess.Entities;

public class MemberTask
{
    public required int ID;

    public Member? Member;
    public required int MemberID;

    public Task? Task;
    public required int TaskID;

    public required DateTime CreatedAt;
}