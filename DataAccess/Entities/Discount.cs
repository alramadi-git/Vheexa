namespace DataAccess.Entities;

public class Discount
{
    public required int ID;

    public required string Code;
    public required float DiscountPercentage;

    public required bool IsLimitedPerUser;
    public required bool MaximumUsagePerUser;

    public required int InStock;

    public required bool IsPublished;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}