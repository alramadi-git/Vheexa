namespace DataAccess.Entities;

public class VehicleImage
{
    public uint ID;

    public Vehicle? Vehicle;
    public required uint VehicleID;

    public Image? Image;
    public required uint ImageID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;
}