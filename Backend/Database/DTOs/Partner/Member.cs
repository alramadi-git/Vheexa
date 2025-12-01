using Database.Entities;

namespace Database.DTOs.Partner;

public class MemberDTO : AbstractHumanDTO
{
    public PartnerDTO Partner { get; set; }
    public RoleDTO Role { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public MemberDTO(MemberEntity memberEntity, RolePermissionEntity[] permissions) : base(memberEntity.Human)
    {
        Partner = new PartnerDTO(memberEntity.Partner);
        Role = new RoleDTO(memberEntity.Role, permissions);

        UpdatedAt = memberEntity.UpdatedAt;
        CreatedAt = memberEntity.CreatedAt;
    }
}