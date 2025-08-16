namespace DataAccess.Entities;

public class User
{
    public uint ID;

    public Human? Human;
    public required uint HumanID;

    public required float AverageRates;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}