using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class MemberEntityDTO : AbstractHumanEntityDTO
{
    public int PartnerID { get; set; }
    
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public MemberEntityDTO(MemberEntity member) : base(member.Human!)
    {
        PartnerID = member.PartnerID;

        IsDeleted = member.IsDeleted;
        DeletedAt = member.DeletedAt;

        UpdatedAt = member.UpdatedAt;
        CreatedAt = member.CreatedAt;
    }
}