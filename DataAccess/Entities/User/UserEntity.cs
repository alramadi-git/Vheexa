namespace DataAccess.Entities;

public class UserEntity
{
    public int ID { get; set; }

    public HumanEntity? Human { get; set; }
    public int HumanID { get; set; }

    public required float AverageRates { get; set; }

    public required bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public required DateTime UpdatedAt { get; set; }
    public required DateTime CreatedAt { get; set; }
}