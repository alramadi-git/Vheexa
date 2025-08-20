namespace DataAccess.Entities;

public class PartnerEntity
{
    public int ID;

    public required string Handle;

    public required float AverageRates;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}