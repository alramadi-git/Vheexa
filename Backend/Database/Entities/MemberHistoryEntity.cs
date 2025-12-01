namespace Database.Entities;

public class MemberHistoryEntity
{
    public Guid UUID { get; set; }

    public Guid MemberUUID { get; set; }
    public MemberEntity Member { get; set; }

    public Guid HistoryUUID { get; set; }
    public HistoryEntity History { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}