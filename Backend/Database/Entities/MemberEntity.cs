using Database.Enums;

namespace Database.Entities;

public class ClsMemberEntity
{
    public Guid Uuid { get; set; }
    public Guid PartnerUuid { get; set; }
    public ClsPartnerEntity Partner { get; set; }
    public Guid RoleUuid { get; set; }
    public ClsPartnerRoleEntity Role { get; set; }
    public Guid BranchUuid { get; set; }
    public ClsBranchEntity Branch { get; set; }
    public string? AvatarId { get; set; }
    public ClsImageEntity? Avatar { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}