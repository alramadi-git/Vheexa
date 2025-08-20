namespace DataAccess.Entities;

public class VehicleInstanceEntity
{
    public int ID;

    public VehicleEntity? Vehicle;
    public int VehicleID;

    public VehicleColorEntity? VehicleColor;
    public int VehicleColorID;

    public required int InStock;
    public required int InUse;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;

    public required DateTime UpdatedAt;
    public required DateTime CreatedAt;
}