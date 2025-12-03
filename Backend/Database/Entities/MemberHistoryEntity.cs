namespace Database.Entities;

public class MemberHistoryEntity
{
    public Guid UUID { get; set; }
    public Guid MemberUUID { get; set; }
    public MemberEntity Member { get; set; }
    public Guid HistoryUUID { get; set; }
    public HistoryEntity History { get; set; }
    public DateTime CreatedAt { get; set; }
}