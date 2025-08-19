namespace DataAccess.Entities;

public class VehicleColor
{
    public int ID;

    public Vehicle? Vehicle;
    public int VehicleID;

    public required string Name;
    public required string HexCode;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;
}