namespace DataAccess.Entities;

public class User
{
    public int ID;

    public Human? Human;
    public int HumanID;

    public required float AverageRates;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}