namespace DataAccess.Entities;

public class Partner
{
    public required int ID;

    public required string Handle;

    public required float AverageRates;

    public required bool IsPublished;

    public required bool IsDeleted;
    public required DateTime DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}