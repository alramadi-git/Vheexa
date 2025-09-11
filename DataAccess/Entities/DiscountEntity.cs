namespace DataAccess.Entities;

public class DiscountEntity
{
    public int ID { get; set; }

    public required string Code { get; set; }
    public float DiscountPercentage { get; set; }

    public int InStock { get; set; }

    public bool IsUsageLimitedPerUser { get; set; }
    public int MaxUsagePerUser { get; set; }

    public bool IsAvailable { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}