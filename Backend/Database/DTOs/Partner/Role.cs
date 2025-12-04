using Database.Entities;

namespace Database.DTOs.Partner;

public class ClsRoleDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public ClsPermissionDTO[] Permissions { get; set; }

    public ClsRoleDTO(PartnerRoleEntity roleEntity, PermissionEntity[] permissions)
    {
        UUID = roleEntity.UUID;
        Name = roleEntity.Role.Name;
        Permissions = [.. permissions.Select(permission => new ClsPermissionDTO(permission))];
    }
}