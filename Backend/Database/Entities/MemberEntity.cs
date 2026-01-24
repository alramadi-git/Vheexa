namespace Database.Entities;

public class MemberEntity
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public Guid UUID { get; set; }
    public Guid PartnerUUID { get; set; }
    public PartnerEntity Partner { get; set; }
    public Guid RoleUUID { get; set; }
    public PartnerRoleEntity Role { get; set; }
    public Guid BranchUUID { get; set; }
    public BranchEntity Branch { get; set; }
    public string? Avatar { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}