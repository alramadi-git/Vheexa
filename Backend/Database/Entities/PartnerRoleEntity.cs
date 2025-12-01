namespace Database.Entities;

public class PartnerRoleEntity
{
    public Guid UUID { get; set; }

    public Guid PartnerUUID { get; set; }
    public PartnerEntity Partner { get; set; }

    public Guid RoleUUID { get; set; }
    public RoleEntity Role { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}