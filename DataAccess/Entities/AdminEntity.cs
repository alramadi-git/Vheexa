namespace DataAccess.Entities;

public class AdminEntity
{
    public int ID { get; set; }

    public HumanEntity? Human { get; set; }
    public int HumanID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}