using Database.Entities;

namespace Database.DTOs.Partner;

public class ClsPermissionDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public ClsPermissionDTO(PermissionEntity permissionEntity)
    {
        UUID = permissionEntity.UUID;
        Name = permissionEntity.Name;
        Description = permissionEntity.Description;
    }
}