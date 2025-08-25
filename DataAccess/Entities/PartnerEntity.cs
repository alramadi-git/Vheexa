namespace DataAccess.Entities;

public class PartnerEntity
{
    public int ID { get; set; }

    public required string Handle { get; set; }

    public float AverageRates { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}