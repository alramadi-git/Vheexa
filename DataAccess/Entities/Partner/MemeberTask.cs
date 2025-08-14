namespace DataAccess.Entities;

public class MemberTask
{
    public uint ID;

    public Member? Member;
    public uint MemberID;

    public Task? Task;
    public uint TaskID;

    public DateTime CreatedAt;
}