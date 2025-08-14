namespace DataAccess.Entities;

public class VehicleInstance
{
    public uint ID;

    public Vehicle? Vehicle;
    public uint VehicleID;

    public VehicleColor? VehicleColor;
    public uint VehicleColorID;

    public uint InStock;
    public uint InUse;

    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime UpdatedAt;
    public DateTime CreatedAt;
}