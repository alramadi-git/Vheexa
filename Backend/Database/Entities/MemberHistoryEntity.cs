namespace Database.Entities;

public class ClsMemberHistoryEntity
{
    public Guid Uuid { get; set; }
    public Guid MemberUuid { get; set; }
    public ClsMemberEntity Member { get; set; }
    public Guid HistoryUuid { get; set; }
    public ClsHistoryEntity History { get; set; }
    public DateTime CreatedAt { get; set; }
}