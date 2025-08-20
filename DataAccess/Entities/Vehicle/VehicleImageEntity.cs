namespace DataAccess.Entities;

public class VehicleImageEntity
{
    public int ID;

    public VehicleEntity? Vehicle;
    public int VehicleID;

    public ImageEntity? Image;
    public int ImageID;

    public required bool IsPublished;

    public required bool IsDeleted;
    public DateTime? DeletedAt;
}