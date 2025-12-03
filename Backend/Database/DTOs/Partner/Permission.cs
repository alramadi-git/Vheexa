using Database.Entities;

namespace Database.DTOs.Partner;

public class PermissionDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public PermissionDTO(PermissionEntity permissionEntity)
    {
        UUID = permissionEntity.UUID;
        Name = permissionEntity.Name;
        Description = permissionEntity.Description;
    }
}