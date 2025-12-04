using Database.DTOs.Abstracts;
using Database.DTOs.User;
using Database.Entities;

namespace Database.DTOs.Partner;

public class ClsMemberDTO : AbstractClsHumanDTO
{
    public Guid UUID { get; set; }
    public ClsPartnerDTO Partner { get; set; }
    public ClsRoleDTO Role { get; set; }
    public ClsBranchDTO Branch { get; set; }
    public MemberEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public ClsMemberDTO(MemberEntity member, PermissionEntity[] permissions) : base(member.Human)
    {
        UUID = member.UUID;
        Partner = new ClsPartnerDTO(member.Partner);
        Role = new ClsRoleDTO(member.Role, permissions);
        Branch = new ClsBranchDTO(member.Branch);
        UpdatedAt = member.UpdatedAt;
        CreatedAt = member.CreatedAt;
    }
}