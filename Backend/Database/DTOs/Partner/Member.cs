using Database.Entities;

namespace Database.DTOs.Partner;

public class MemberDTO
{
    public Guid UUID { get; set; }
    public HumanDTO Human { get; set; }
    public PartnerDTO Partner { get; set; }
    public RoleDTO Role { get; set; }
    public BranchDTO Branch { get; set; }
    public MemberEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public MemberDTO(MemberEntity memberEntity, PermissionEntity[] permissions)
    {
        UUID = memberEntity.UUID;
        Human = new HumanDTO(memberEntity.Human);
        Partner = new PartnerDTO(memberEntity.Partner);
        Role = new RoleDTO(memberEntity.Role, permissions);
        Branch = new BranchDTO(memberEntity.Branch);
        UpdatedAt = memberEntity.UpdatedAt;
        CreatedAt = memberEntity.CreatedAt;
    }
}