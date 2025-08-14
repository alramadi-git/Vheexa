namespace DataAccess.Entities;

public class VehicleColor
{
    public uint ID;

    public Vehicle? Vehicle;
    public uint VehicleID;

    public required string Name;
    public required string HexCode;

    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;
}