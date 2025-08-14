namespace DataAccess.Entities;

public class VehicleImage
{
    public uint ID;

    public Vehicle? Vehicle;
    public uint VehicleID;

    public Image? Image;
    public uint ImageID;

    public bool IsPublished;

    public bool IsDeleted;
    public DateTime DeletedAt;
}