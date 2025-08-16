namespace DataAccess.Entities;

public class VehicleInstance
{
    public uint ID;

    public Vehicle? Vehicle;
    public required uint VehicleID;

    public VehicleColor? VehicleColor;
    public required uint VehicleColorID;

    public required uint InStock;
    public required uint InUse;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}