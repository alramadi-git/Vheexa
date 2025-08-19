namespace DataAccess.Entities;

public class VehicleImage
{
    public int ID;

    public Vehicle? Vehicle;
    public int VehicleID;

    public Image? Image;
    public int ImageID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;
}