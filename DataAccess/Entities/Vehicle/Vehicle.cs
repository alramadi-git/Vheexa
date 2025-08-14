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

    public uint ID;

    public required string Name;
    public required string Description;

    public float AverageRates;

    public CATEGORY Category;

    public required string Manufacturer;
    public DateOnly ManufacturingYear;

    public ushort Capacity;

    public required string[] Tags;

    public double Price;
    public float discount;

    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}