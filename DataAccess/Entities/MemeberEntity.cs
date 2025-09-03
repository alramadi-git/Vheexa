namespace DataAccess.Entities;

public class MemberEntity
{
    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public HumanEntity? Human { get; set; }
    public int HumanID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}