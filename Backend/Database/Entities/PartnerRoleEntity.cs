namespace Database.Entities;

public class ClsPartnerRoleEntity
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public Guid Uuid { get; set; }
    public Guid PartnerUuid { get; set; }
    public ClsPartnerEntity Partner { get; set; }
    public Guid RoleUuid { get; set; }
    public ClsRoleEntity Role { get; set; }
    public int AssignedCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}