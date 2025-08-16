namespace DataAccess.Entities;

public class Discount
{
    public uint ID;

    public required string Code;

    public required uint InStock;
    public required uint InUse;

    public required bool IsUsageLimitedPerUser;
    public required uint MaxUsagePerUser;


    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}