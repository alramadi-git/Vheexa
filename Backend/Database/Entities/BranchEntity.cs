namespace Database.Entities;

public class BranchEntity
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public Guid UUID { get; set; }
    public Guid PartnerUUID { get; set; }
    public PartnerEntity Partner { get; set; }
    public Guid LocationUUID { get; set; }
    public LocationEntity Location { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}