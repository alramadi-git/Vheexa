namespace DataAccess.Entities;

public class MemberTaskEntity
{
    public int ID { get; set; }

    public MemberEntity? Member { get; set; }
    public int MemberID { get; set; }

    public TaskEntity? Task { get; set; }
    public int TaskID { get; set; }

    public DateTime CreatedAt { get; set; }
}