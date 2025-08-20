namespace DataAccess.Entities;

public class MemberTaskEntity
{
    public int ID;

    public MemberEntity? Member;
    public int MemberID;

    public TaskEntity? Task;
    public int TaskID;

    public required DateTime CreatedAt;
}