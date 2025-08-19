namespace DataAccess.Entities;

public class VehicleInstance
{
    public int ID;

    public Vehicle? Vehicle;
    public int VehicleID;

    public VehicleColor? VehicleColor;
    public int VehicleColorID;

    public required int InStock;
    public required int InUse;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}