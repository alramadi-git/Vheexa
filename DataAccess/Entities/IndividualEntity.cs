namespace DataAccess.Entities;

public class IndividualEntity
{
    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public HumanEntity? Human { get; set; }
    public int HumanID { get; set; }
}