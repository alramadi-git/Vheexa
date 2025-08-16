namespace DataAccess.Entities;

public class MemberTask
{
    public uint ID;

    public Member? Member;
    public required uint MemberID;

    public Task? Task;
    public required uint TaskID;

    public required DateTime CreatedAt;
}