namespace DataAccess.Entities;

public class DiscountEntity
{
    public int ID;

    public required string Code;

    public required int InStock;
    public required int InUse;

    public required bool IsUsageLimitedPerUser;
    public required int MaxUsagePerUser;


    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}