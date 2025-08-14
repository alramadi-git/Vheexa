namespace DataAccess.Entities;

public class Discount
{
    public uint ID;

    public required string Code;

    public uint InStock;
    public uint InUse;

    public bool IsUsageLimitedPerUser;
    public uint MaxUsagePerUser;


    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}