using Database.Enums;

namespace Database.Entities;

public class ClsBranchEntity
{
    public Guid Uuid { get; set; }
    public Guid PartnerUuid { get; set; }
    public ClsPartnerEntity Partner { get; set; }
    public Guid LocationUuid { get; set; }
    public ClsLocationEntity Location { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public int MemberCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}