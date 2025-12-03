using Database.Entities;

namespace Database.DTOs.Partner;

public class RoleDTO
{
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public PermissionDTO[] Permissions { get; set; }

    public RoleDTO(PartnerRoleEntity roleEntity, PermissionEntity[] permissions)
    {
        UUID = roleEntity.UUID;
        Name = roleEntity.Role.Name;
        Permissions = permissions.Select(permission => new PermissionDTO(permission)).ToArray();
    }
}