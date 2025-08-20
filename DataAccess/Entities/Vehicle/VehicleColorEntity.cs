namespace DataAccess.Entities;

public class VehicleColorEntity
{
    public int ID;

    public VehicleEntity? Vehicle;
    public int VehicleID;

    public required string Name;
    public required string HexCode;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;
}