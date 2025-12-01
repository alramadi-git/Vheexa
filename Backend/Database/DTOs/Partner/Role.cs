using Database.Entities;

namespace Database.DTOs.Partner;

public class RoleDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public string[] Permissions { get; set; }

    public RoleDTO(PartnerRoleEntity roleEntity, RolePermissionEntity[] permissions)
    {
        UUID = roleEntity.UUID;
        Name = roleEntity.Role.Name;
        Permissions = permissions.Select(permission => permission.Permission.Name).ToArray();
    }
}