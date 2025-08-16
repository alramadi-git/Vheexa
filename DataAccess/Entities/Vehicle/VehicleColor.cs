namespace DataAccess.Entities;

public class VehicleColor
{
    public uint ID;

    public Vehicle? Vehicle;
    public required uint VehicleID;

    public required string Name;
    public required string HexCode;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;
}