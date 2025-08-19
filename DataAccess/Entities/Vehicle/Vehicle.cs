namespace DataAccess.Entities;

public class Vehicle
{
    public enum CATEGORY
    {
        CAR,
        BUS,
        TRUCK,
        MOTORCYCLE,
        BICYCLE,
        BOAT,
        YACHT,
        HELICOPTER,
    }

    public int ID;

    public required string Name;
    public required string Description;

    public required float AverageRates;

    public required CATEGORY Category;

    public required string Manufacturer;
    public required DateOnly ManufacturingYear;

    public required ushort Capacity;

    public required string[] Tags;

    public required double Price;
    public required float discount;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}