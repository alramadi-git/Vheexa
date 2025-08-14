namespace DataAccess.Entities;

public class User
{
    public uint ID;

    public Human? Human;
    public uint HumanID;

    public float AverageRates;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}